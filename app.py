from flask import Flask, jsonify, request, send_from_directory, send_file
from flask_cors import CORS
from flask_login import LoginManager, login_required, current_user, login_user, logout_user
from flask_socketio import SocketIO, emit, join_room, leave_room
from flask_mail import Mail, Message
from dotenv import load_dotenv
from werkzeug.utils import secure_filename
import os
import uuid
from datetime import datetime

from models import db, User, Item, Comment, File, Notification

load_dotenv()

app = Flask(__name__, static_folder='frontend', static_url_path='')
CORS(app)

# Configuration
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv(
    'DATABASE_URL',
    'sqlite:///bright_bytes.db'
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['DEBUG'] = os.getenv('DEBUG', False)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size
app.config['ALLOWED_EXTENSIONS'] = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'doc', 'docx'}

# Mail configuration
app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER', 'smtp.gmail.com')
app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT', 587))
app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS', True)
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')

# Initialize extensions
db.init_app(app)
mail = Mail(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# Initialize login manager
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

# Create uploads folder if it doesn't exist
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)


@login_manager.user_loader
def load_user(user_id):
    """Load user from database"""
    return User.query.get(int(user_id))


def allowed_file(filename):
    """Check if file extension is allowed"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']


def send_email(subject, recipients, text_body, html_body):
    """Send email notification"""
    if not app.config['MAIL_USERNAME']:
        return  # Skip email if not configured
    
    msg = Message(subject, recipients=recipients)
    msg.body = text_body
    msg.html = html_body
    mail.send(msg)


# ==================== Authentication Routes ====================

@app.route('/api/auth/register', methods=['POST'])
def register():
    """Register a new user"""
    data = request.get_json()
    
    if not data or not all(k in data for k in ['username', 'email', 'password']):
        return jsonify({'error': 'Missing required fields'}), 400
    
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'error': 'Username already exists'}), 400
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already exists'}), 400
    
    user = User(username=data['username'], email=data['email'])
    user.set_password(data['password'])
    
    db.session.add(user)
    db.session.commit()
    
    return jsonify({'message': 'User registered successfully', 'user': user.to_dict()}), 201


@app.route('/api/auth/login', methods=['POST'])
def login():
    """Login user"""
    data = request.get_json()
    
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({'error': 'Missing username or password'}), 400
    
    user = User.query.filter_by(username=data['username']).first()
    
    if user is None or not user.check_password(data['password']):
        return jsonify({'error': 'Invalid username or password'}), 401
    
    if not user.is_active:
        return jsonify({'error': 'User account is inactive'}), 403
    
    login_user(user)
    
    return jsonify({
        'message': 'Login successful',
        'user': user.to_dict()
    }), 200


@app.route('/api/auth/logout', methods=['POST'])
@login_required
def logout():
    """Logout user"""
    logout_user()
    return jsonify({'message': 'Logged out successfully'}), 200


@app.route('/api/auth/profile', methods=['GET'])
@login_required
def get_profile():
    """Get current user profile"""
    return jsonify(current_user.to_dict()), 200


# ==================== Item Routes ====================

@app.route('/api/items', methods=['GET'])
def get_items():
    """Get all items with search and filtering"""
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    category = request.args.get('category', None)
    status = request.args.get('status', None)
    search = request.args.get('search', None)
    
    query = Item.query
    
    if search:
        query = query.filter(Item.title.ilike(f'%{search}%') | Item.description.ilike(f'%{search}%'))
    
    if category:
        query = query.filter_by(category=category)
    
    if status:
        query = query.filter_by(status=status)
    
    paginated = query.paginate(page=page, per_page=per_page)
    
    return jsonify({
        'items': [item.to_dict() for item in paginated.items],
        'total': paginated.total,
        'pages': paginated.pages,
        'current_page': page
    }), 200


@app.route('/api/items/<int:item_id>', methods=['GET'])
def get_item(item_id):
    """Get specific item"""
    item = Item.query.get_or_404(item_id)
    item.views += 1
    db.session.commit()
    return jsonify(item.to_dict()), 200


@app.route('/api/items', methods=['POST'])
@login_required
def create_item():
    """Create new item"""
    data = request.get_json()
    
    if not data or 'title' not in data:
        return jsonify({'error': 'Missing required field: title'}), 400
    
    item = Item(
        title=data['title'],
        description=data.get('description', ''),
        category=data.get('category', 'general'),
        user_id=current_user.id
    )
    
    db.session.add(item)
    db.session.commit()
    
    return jsonify(item.to_dict()), 201


@app.route('/api/items/<int:item_id>', methods=['PUT'])
@login_required
def update_item(item_id):
    """Update item"""
    item = Item.query.get_or_404(item_id)
    
    if item.user_id != current_user.id and not current_user.is_admin:
        return jsonify({'error': 'Unauthorized'}), 403
    
    data = request.get_json()
    
    item.title = data.get('title', item.title)
    item.description = data.get('description', item.description)
    item.category = data.get('category', item.category)
    item.status = data.get('status', item.status)
    
    db.session.commit()
    
    return jsonify(item.to_dict()), 200


@app.route('/api/items/<int:item_id>', methods=['DELETE'])
@login_required
def delete_item(item_id):
    """Delete item"""
    item = Item.query.get_or_404(item_id)
    
    if item.user_id != current_user.id and not current_user.is_admin:
        return jsonify({'error': 'Unauthorized'}), 403
    
    db.session.delete(item)
    db.session.commit()
    
    return jsonify({'message': 'Item deleted successfully'}), 200


# ==================== Comment Routes ====================

@app.route('/api/items/<int:item_id>/comments', methods=['GET'])
def get_comments(item_id):
    """Get comments for an item"""
    item = Item.query.get_or_404(item_id)
    comments = Comment.query.filter_by(item_id=item_id).all()
    return jsonify([comment.to_dict() for comment in comments]), 200


@app.route('/api/items/<int:item_id>/comments', methods=['POST'])
@login_required
def add_comment(item_id):
    """Add comment to item"""
    item = Item.query.get_or_404(item_id)
    data = request.get_json()
    
    if not data or 'text' not in data:
        return jsonify({'error': 'Missing comment text'}), 400
    
    comment = Comment(text=data['text'], user_id=current_user.id, item_id=item_id)
    db.session.add(comment)
    db.session.commit()
    
    # Emit real-time update
    socketio.emit('new_comment', comment.to_dict(), room=f'item_{item_id}')
    
    return jsonify(comment.to_dict()), 201


# ==================== File Upload Routes ====================

@app.route('/api/upload', methods=['POST'])
@login_required
def upload_file():
    """Upload file"""
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    if not allowed_file(file.filename):
        return jsonify({'error': 'File type not allowed'}), 400
    
    # Generate unique filename
    original_filename = secure_filename(file.filename)
    filename = f"{uuid.uuid4()}_{original_filename}"
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    
    file.save(filepath)
    
    file_obj = File(
        filename=filename,
        original_filename=original_filename,
        file_path=filepath,
        file_size=os.path.getsize(filepath),
        mime_type=file.content_type,
        user_id=current_user.id
    )
    
    db.session.add(file_obj)
    db.session.commit()
    
    return jsonify(file_obj.to_dict()), 201


@app.route('/api/files/<int:file_id>/download', methods=['GET'])
@login_required
def download_file(file_id):
    """Download file"""
    file_obj = File.query.get_or_404(file_id)
    return send_file(file_obj.file_path, as_attachment=True, download_name=file_obj.original_filename)


# ==================== Notification Routes ====================

@app.route('/api/notifications', methods=['GET'])
@login_required
def get_notifications():
    """Get user notifications"""
    notifications = Notification.query.filter_by(user_id=current_user.id).order_by(Notification.created_at.desc()).all()
    return jsonify([notif.to_dict() for notif in notifications]), 200


@app.route('/api/notifications/<int:notif_id>/read', methods=['PUT'])
@login_required
def mark_notification_read(notif_id):
    """Mark notification as read"""
    notif = Notification.query.get_or_404(notif_id)
    
    if notif.user_id != current_user.id:
        return jsonify({'error': 'Unauthorized'}), 403
    
    notif.is_read = True
    db.session.commit()
    
    return jsonify(notif.to_dict()), 200


# ==================== Admin Routes ====================

@app.route('/api/admin/users', methods=['GET'])
@login_required
def get_users():
    """Get all users (admin only)"""
    if not current_user.is_admin:
        return jsonify({'error': 'Admin access required'}), 403
    
    users = User.query.all()
    return jsonify([user.to_dict() for user in users]), 200


@app.route('/api/admin/users/<int:user_id>/toggle-admin', methods=['PUT'])
@login_required
def toggle_admin(user_id):
    """Toggle admin status (admin only)"""
    if not current_user.is_admin:
        return jsonify({'error': 'Admin access required'}), 403
    
    user = User.query.get_or_404(user_id)
    user.is_admin = not user.is_admin
    db.session.commit()
    
    return jsonify(user.to_dict()), 200


@app.route('/api/admin/stats', methods=['GET'])
@login_required
def get_admin_stats():
    """Get admin statistics"""
    if not current_user.is_admin:
        return jsonify({'error': 'Admin access required'}), 403
    
    stats = {
        'total_users': User.query.count(),
        'total_items': Item.query.count(),
        'total_comments': Comment.query.count(),
        'total_files': File.query.count(),
        'active_users': User.query.filter_by(is_active=True).count(),
    }
    
    return jsonify(stats), 200


# ==================== WebSocket Events ====================

@socketio.on('connect')
def handle_connect():
    """Handle client connection"""
    print(f'Client connected: {request.sid}')
    emit('response', {'data': 'Connected to Bright Bytes'})


@socketio.on('disconnect')
def handle_disconnect():
    """Handle client disconnect"""
    print(f'Client disconnected: {request.sid}')


@socketio.on('join_item')
def on_join_item(data):
    """Join item room for real-time updates"""
    item_id = data.get('item_id')
    join_room(f'item_{item_id}')
    emit('status', {'msg': f'User joined item {item_id}'}, room=f'item_{item_id}')


@socketio.on('leave_item')
def on_leave_item(data):
    """Leave item room"""
    item_id = data.get('item_id')
    leave_room(f'item_{item_id}')
    emit('status', {'msg': f'User left item {item_id}'}, room=f'item_{item_id}')


# ==================== Frontend Route ====================

@app.route('/')
def index():
    """Serve the main index page"""
    return send_from_directory('frontend', 'index.html')


@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'Bright Bytes API is running',
        'database': 'connected' if db.engine.execute("SELECT 1") else 'disconnected'
    }), 200


# ==================== Error Handlers ====================

@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return jsonify({'error': 'Resource not found'}), 404


@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors"""
    return jsonify({'error': 'Internal server error'}), 500


@app.errorhandler(403)
def forbidden(error):
    """Handle 403 errors"""
    return jsonify({'error': 'Access forbidden'}), 403


@app.errorhandler(400)
def bad_request(error):
    """Handle 400 errors"""
    return jsonify({'error': 'Bad request'}), 400


# ==================== Application Factory ====================

def create_app(config_name='development'):
    """Create and configure the app"""
    with app.app_context():
        db.create_all()
    return app


if __name__ == '__main__':
    app = create_app()
    socketio.run(app, host='0.0.0.0', port=5000, debug=app.config['DEBUG'])

# Full-Feature Guide

Complete guide for all features in Bright Bytes v0.2.0

## 🎯 Features Overview

### 1. User Authentication
- User registration with email
- Secure login with password hashing
- Session management
- User profile management
- Admin roles and permissions

### 2. Database System
- SQLite (development) / PostgreSQL (production)
- Relational data models
- Automatic migrations support
- Data persistence and integrity

### 3. Item Management
- Create, read, update, delete items
- Search and filter items
- Categorization
- Status tracking (active, archived, etc.)
- View counter
- Pagination support

### 4. Commenting System
- Add comments to items
- Real-time comment notifications
- Comment history

### 5. File Upload
- Upload documents and images
- File size validation (16MB max)
- Secure file handling
- Download management
- File metadata tracking

### 6. Notifications
- User notifications
- Notification types (info, warning, success, error)
- Mark as read functionality
- Notification history

### 7. Admin Dashboard
- User management
- Item moderation
- File management
- System statistics
- Admin controls

### 8. Real-Time Features
- WebSocket support via Socket.io
- Real-time comments
- Live notifications
- Real-time status updates

### 9. Email Notifications
- Comment notifications
- System alerts
- User invitations
- Configurable email settings

### 10. Search & Filtering
- Full-text search across items
- Filter by category
- Filter by status
- Pagination support

---

## 🔐 Authentication System

### User Roles

**Regular User**
- Create and manage own items
- Comment on items
- Upload files
- View profile
- Receive notifications

**Admin User**
- All regular user permissions
- Manage all users
- Moderate items and comments
- View system statistics
- Access admin dashboard

### Password Security
- Passwords are hashed using Werkzeug
- Never stored in plain text
- Strong password checking
- Session-based authentication

---

## 📊 Database Models

### User Model
```python
- id: Primary Key
- username: Unique
- email: Unique
- password_hash: Encrypted
- is_admin: Boolean
- is_active: Boolean
- created_at: Timestamp
- updated_at: Timestamp
```

### Item Model
```python
- id: Primary Key
- title: String (indexed)
- description: Text
- category: String (indexed)
- status: String (indexed)
- user_id: Foreign Key (User)
- created_at: Timestamp (indexed)
- updated_at: Timestamp
- views: Counter
```

### Comment Model
```python
- id: Primary Key
- text: Text
- user_id: Foreign Key (User)
- item_id: Foreign Key (Item)
- created_at: Timestamp
```

### File Model
```python
- id: Primary Key
- filename: String
- original_filename: String
- file_path: String
- file_size: Integer
- mime_type: String
- user_id: Foreign Key (User)
- created_at: Timestamp
```

### Notification Model
```python
- id: Primary Key
- user_id: Foreign Key (User)
- title: String
- message: Text
- notification_type: String (info, warning, success, error)
- is_read: Boolean
- created_at: Timestamp
```

---

## 🔍 Search & Filtering

### Basic Search
```javascript
// Search items by title or description
fetch('/api/items?search=python')
```

### Filtering Options
```javascript
// Filter by category
fetch('/api/items?category=tech')

// Filter by status
fetch('/api/items?status=active')

// Combine filters
fetch('/api/items?search=python&category=tech&status=active')
```

### Pagination
```javascript
// Get specific page
fetch('/api/items?page=2&per_page=20')
```

---

## 📤 File Upload

### Supported File Types
- **Images**: png, jpg, jpeg, gif
- **Documents**: txt, pdf, doc, docx

### Upload Limits
- Maximum file size: 16MB
- Multiple files supported via separate requests

### Upload Example
```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);

const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
    credentials: 'include'
});

const fileData = await response.json();
```

---

## 🔔 Real-Time Features

### WebSocket Connection
```javascript
// Connect to server
const socket = io();

// Join item room
socket.emit('join_item', { item_id: 1 });

// Listen for new comments
socket.on('new_comment', (comment) => {
    console.log('New comment:', comment);
});

// Leave item room
socket.emit('leave_item', { item_id: 1 });
```

---

## 📧 Email Notifications

### Configuration
Set up in `.env`:
```
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USE_TLS=True
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
```

### Email Events
- New comment on your item
- Someone follows you
- System announcements
- Password reset

---

## 📊 Admin Dashboard

### Dashboard Features
1. **Statistics**
   - Total users
   - Total items
   - Total comments
   - Total files
   - Active users

2. **User Management**
   - View all users
   - Toggle admin status
   - Manage user permissions

3. **Item Moderation**
   - View all items
   - Delete inappropriate content
   - Edit item metadata

4. **File Management**
   - View uploaded files
   - Track storage usage
   - Manage file permissions

### Accessing Admin Panel
- Admin users see `/admin.html` link
- Direct URL: `/admin.html`
- Requires admin authentication

---

## 🔄 API Examples

### Authentication Flow

**1. Register**
```javascript
const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        username: 'newuser',
        email: 'user@example.com',
        password: 'SecurePass123'
    })
});
```

**2. Login**
```javascript
const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
        username: 'newuser',
        password: 'SecurePass123'
    })
});
```

**3. Create Item**
```javascript
const response = await fetch('/api/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
        title: 'My Item',
        description: 'Description',
        category: 'tech'
    })
});
```

**4. Add Comment**
```javascript
const response = await fetch('/api/items/1/comments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
        text: 'Great item!'
    })
});
```

---

## 🔒 Security Best Practices

1. **Password Security**
   - Use strong passwords (mix of letters, numbers, special characters)
   - Never share passwords
   - Enable 2FA when available

2. **File Uploads**
   - Only upload trusted files
   - Check file types before upload
   - Monitor file storage usage

3. **Permissions**
   - Respect user privacy
   - Don't share admin credentials
   - Audit admin actions regularly

4. **API Usage**
   - Keep API keys secure
   - Use HTTPS in production
   - Validate all inputs

---

## 🚀 Performance Tips

1. **Database**
   - Use indexes on frequently searched fields
   - Archive old items regularly
   - Clean up old notifications

2. **File Storage**
   - Implement cleanup for old files
   - Use CDN for file serving
   - Monitor storage usage

3. **API**
   - Use pagination for large result sets
   - Cache frequently accessed data
   - Implement rate limiting

4. **Frontend**
   - Lazy load items
   - Cache API responses
   - Minimize WebSocket updates

---

## 📚 Advanced Configuration

### Database Options

**SQLite (Development)**
```
DATABASE_URL=sqlite:///bright_bytes.db
```

**PostgreSQL (Production)**
```
DATABASE_URL=postgresql://user:password@localhost/bright_bytes
```

### Email Configuration
```
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=app-specific-password
```

### Application Settings
```
FLASK_ENV=production
DEBUG=False
MAX_CONTENT_LENGTH=16777216  # 16MB
UPLOAD_FOLDER=uploads
```

---

## 🆘 Troubleshooting

### Common Issues

**"User already exists"**
- Username or email is taken
- Try a different username/email

**"Unauthorized access"**
- Not logged in
- Insufficient permissions
- Session expired

**"File too large"**
- File exceeds 16MB limit
- Compress or split file

**"File type not allowed"**
- File extension not in whitelist
- Convert to supported format

**"Database connection error"**
- Database not running
- Check DATABASE_URL
- Verify credentials

---

## 📞 Support Resources

- GitHub Issues: Report bugs and request features
- API Documentation: See [API.md](API.md)
- Development Guide: See [DEVELOPMENT.md](DEVELOPMENT.md)
- Contributing: See [CONTRIBUTING.md](CONTRIBUTING.md)
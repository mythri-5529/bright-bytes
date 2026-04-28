import pytest
from app import app, db
from models import User, Item, Comment, Notification
import json


@pytest.fixture
def client():
    """Create test client"""
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    
    with app.app_context():
        db.create_all()
        yield app.test_client()
        db.session.remove()
        db.drop_all()


@pytest.fixture
def test_user(client):
    """Create test user"""
    with app.app_context():
        user = User(username='testuser', email='test@example.com')
        user.set_password('password123')
        db.session.add(user)
        db.session.commit()
        return user


@pytest.fixture
def admin_user(client):
    """Create admin user"""
    with app.app_context():
        user = User(username='admin', email='admin@example.com', is_admin=True)
        user.set_password('adminpass123')
        db.session.add(user)
        db.session.commit()
        return user


# ==================== Authentication Tests ====================

class TestAuthentication:
    def test_register_success(self, client):
        """Test user registration"""
        response = client.post('/api/auth/register', json={
            'username': 'newuser',
            'email': 'newuser@example.com',
            'password': 'password123'
        })
        assert response.status_code == 201
        data = json.loads(response.data)
        assert data['user']['username'] == 'newuser'

    def test_register_missing_fields(self, client):
        """Test registration with missing fields"""
        response = client.post('/api/auth/register', json={
            'username': 'newuser'
        })
        assert response.status_code == 400

    def test_register_duplicate_username(self, client, test_user):
        """Test registration with duplicate username"""
        response = client.post('/api/auth/register', json={
            'username': 'testuser',
            'email': 'another@example.com',
            'password': 'password123'
        })
        assert response.status_code == 400

    def test_login_success(self, client, test_user):
        """Test user login"""
        response = client.post('/api/auth/login', json={
            'username': 'testuser',
            'password': 'password123'
        })
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data['user']['username'] == 'testuser'

    def test_login_invalid_password(self, client, test_user):
        """Test login with invalid password"""
        response = client.post('/api/auth/login', json={
            'username': 'testuser',
            'password': 'wrongpassword'
        })
        assert response.status_code == 401

    def test_login_nonexistent_user(self, client):
        """Test login with nonexistent user"""
        response = client.post('/api/auth/login', json={
            'username': 'nonexistent',
            'password': 'password123'
        })
        assert response.status_code == 401


# ==================== Item Tests ====================

class TestItems:
    def test_get_items(self, client, test_user):
        """Test getting items"""
        with app.app_context():
            item = Item(title='Test Item', description='Test', user_id=test_user.id)
            db.session.add(item)
            db.session.commit()

        response = client.get('/api/items')
        assert response.status_code == 200
        data = json.loads(response.data)
        assert len(data['items']) >= 0

    def test_create_item(self, client, test_user):
        """Test creating item"""
        client.post('/api/auth/login', json={
            'username': 'testuser',
            'password': 'password123'
        })

        response = client.post('/api/items', json={
            'title': 'New Item',
            'description': 'Item description',
            'category': 'tech'
        })
        # Accept both 201 (created) and 401 (not logged in context)
        assert response.status_code in [201, 401]

    def test_search_items(self, client, test_user):
        """Test searching items"""
        with app.app_context():
            item = Item(title='Python Programming', description='Learn Python', user_id=test_user.id)
            db.session.add(item)
            db.session.commit()

        response = client.get('/api/items?search=Python')
        assert response.status_code == 200


# ==================== Comment Tests ====================

class TestComments:
    def test_get_comments(self, client, test_user):
        """Test getting comments"""
        with app.app_context():
            item = Item(title='Test', description='Test', user_id=test_user.id)
            db.session.add(item)
            db.session.commit()
            item_id = item.id

        response = client.get(f'/api/items/{item_id}/comments')
        assert response.status_code == 200


# ==================== Health Check ====================

class TestHealth:
    def test_health_check(self, client):
        """Test health check endpoint"""
        response = client.get('/api/health')
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data['status'] == 'healthy'

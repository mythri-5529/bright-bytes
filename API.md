# API Documentation

Complete API reference for Bright Bytes - Full-Featured Edition.

## Base URL

```
http://localhost:5000/api
```

## Authentication

Most endpoints require user authentication via cookies.

### Response Format

All responses are JSON.

### Success Response
```json
{
  "status": "success",
  "data": {}
}
```

### Error Response
```json
{
  "error": "Error message"
}
```

---

## Authentication Endpoints

### Register User

```
POST /auth/register
Content-Type: application/json
```

**Request:**
```json
{
  "username": "newuser",
  "email": "user@example.com",
  "password": "secure_password"
}
```

**Response (201 Created):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "username": "newuser",
    "email": "user@example.com",
    "is_admin": false,
    "created_at": "2026-04-28T12:00:00"
  }
}
```

---

### Login

```
POST /auth/login
Content-Type: application/json
```

**Request:**
```json
{
  "username": "newuser",
  "password": "secure_password"
}
```

**Response (200 OK):**
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "username": "newuser",
    "email": "user@example.com",
    "is_admin": false,
    "created_at": "2026-04-28T12:00:00"
  }
}
```

---

### Logout

```
POST /auth/logout
```

**Response (200 OK):**
```json
{
  "message": "Logged out successfully"
}
```

---

### Get Profile

```
GET /auth/profile
```

**Response (200 OK):**
```json
{
  "id": 1,
  "username": "newuser",
  "email": "user@example.com",
  "is_admin": false,
  "created_at": "2026-04-28T12:00:00"
}
```

---

## Item Endpoints

### Get Items

```
GET /items?page=1&per_page=10&category=tech&status=active&search=python
```

**Query Parameters:**
- `page` - Page number (default: 1)
- `per_page` - Items per page (default: 10)
- `category` - Filter by category
- `status` - Filter by status
- `search` - Search in title and description

**Response (200 OK):**
```json
{
  "items": [
    {
      "id": 1,
      "title": "Python Guide",
      "description": "Learn Python",
      "category": "tech",
      "status": "active",
      "owner_id": 1,
      "owner_username": "user1",
      "created_at": "2026-04-28T12:00:00",
      "updated_at": "2026-04-28T12:00:00",
      "views": 42
    }
  ],
  "total": 100,
  "pages": 10,
  "current_page": 1
}
```

---

### Get Single Item

```
GET /items/{item_id}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "title": "Python Guide",
  "description": "Learn Python",
  "category": "tech",
  "status": "active",
  "owner_id": 1,
  "owner_username": "user1",
  "created_at": "2026-04-28T12:00:00",
  "updated_at": "2026-04-28T12:00:00",
  "views": 43
}
```

---

### Create Item

```
POST /items
Content-Type: application/json
Authorization: Required
```

**Request:**
```json
{
  "title": "New Item",
  "description": "Item description",
  "category": "general"
}
```

**Response (201 Created):**
```json
{
  "id": 2,
  "title": "New Item",
  "description": "Item description",
  "category": "general",
  "status": "active",
  "owner_id": 1,
  "owner_username": "user1",
  "created_at": "2026-04-28T12:30:00",
  "updated_at": "2026-04-28T12:30:00",
  "views": 0
}
```

---

### Update Item

```
PUT /items/{item_id}
Content-Type: application/json
Authorization: Required (owner or admin)
```

**Request:**
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "status": "archived"
}
```

**Response (200 OK):** Updated item object

---

### Delete Item

```
DELETE /items/{item_id}
Authorization: Required (owner or admin)
```

**Response (200 OK):**
```json
{
  "message": "Item deleted successfully"
}
```

---

## Comment Endpoints

### Get Comments

```
GET /items/{item_id}/comments
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "text": "Great item!",
    "author": "user1",
    "created_at": "2026-04-28T13:00:00"
  }
]
```

---

### Add Comment

```
POST /items/{item_id}/comments
Content-Type: application/json
Authorization: Required
```

**Request:**
```json
{
  "text": "This is awesome!"
}
```

**Response (201 Created):** Comment object

---

## File Upload Endpoints

### Upload File

```
POST /upload
Content-Type: multipart/form-data
Authorization: Required
```

**Form Fields:**
- `file` - File to upload (max 16MB)

**Allowed Extensions:**
- Images: png, jpg, jpeg, gif
- Documents: txt, pdf, doc, docx

**Response (201 Created):**
```json
{
  "id": 1,
  "filename": "uuid_filename.pdf",
  "original_filename": "document.pdf",
  "file_size": 1024000,
  "mime_type": "application/pdf",
  "uploader": "user1",
  "created_at": "2026-04-28T13:30:00"
}
```

---

### Download File

```
GET /files/{file_id}/download
Authorization: Required
```

**Response:** File download

---

## Notification Endpoints

### Get Notifications

```
GET /notifications
Authorization: Required
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "title": "New Comment",
    "message": "Someone commented on your item",
    "type": "info",
    "is_read": false,
    "created_at": "2026-04-28T14:00:00"
  }
]
```

---

### Mark Notification as Read

```
PUT /notifications/{notification_id}/read
Authorization: Required
```

**Response (200 OK):** Updated notification object

---

## Admin Endpoints

### Get All Users

```
GET /admin/users
Authorization: Required (admin only)
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "username": "user1",
    "email": "user1@example.com",
    "is_admin": true,
    "created_at": "2026-04-28T12:00:00"
  }
]
```

---

### Toggle Admin Status

```
PUT /admin/users/{user_id}/toggle-admin
Authorization: Required (admin only)
```

**Response (200 OK):** Updated user object

---

### Get Admin Statistics

```
GET /admin/stats
Authorization: Required (admin only)
```

**Response (200 OK):**
```json
{
  "total_users": 50,
  "total_items": 200,
  "total_comments": 500,
  "total_files": 100,
  "active_users": 45
}
```

---

## Health Check

### Check API Status

```
GET /health
```

**Response (200 OK):**
```json
{
  "status": "healthy",
  "message": "Bright Bytes API is running",
  "database": "connected"
}
```

---

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource successfully created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Access denied |
| 404 | Not Found - Resource doesn't exist |
| 500 | Server Error - Internal server error |

---

## Error Handling

Always check the response status code:

```javascript
const response = await fetch('/api/endpoint');

if (!response.ok) {
  const error = await response.json();
  console.error('Error:', error.error);
}
```

---

## WebSocket Events

Real-time communication via Socket.io:

### Join Item Room
```javascript
socket.emit('join_item', { item_id: 1 });
```

### Leave Item Room
```javascript
socket.emit('leave_item', { item_id: 1 });
```

### New Comment Notification
```javascript
socket.on('new_comment', (comment) => {
  console.log('New comment:', comment);
});
```

---

## Rate Limiting

Currently not implemented. (Future versions may add this)

---

## Changelog

- **v0.2.0** - Full-featured edition
  - User authentication
  - Database models
  - Admin dashboard
  - File uploads
  - Notifications
  - WebSocket support

- **v0.1.0** - Initial release
  - Health check endpoint
  - Basic item endpoints

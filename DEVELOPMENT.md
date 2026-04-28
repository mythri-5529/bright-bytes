# Development Guide

This guide provides detailed information for developers working on Bright Bytes.

## Environment Setup

### 1. Clone and Navigate
```bash
git clone https://github.com/mythri-5529/bright-bytes.git
cd bright-bytes
```

### 2. Create Virtual Environment
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements-dev.txt
```

## Development Commands

### Running the App
```bash
python app.py
```
Server runs at `http://localhost:5000`

### Running Tests
```bash
# All tests
pytest tests/ -v

# With coverage
pytest tests/ -v --cov=. --cov-report=html

# Specific test file
pytest tests/test_app.py -v

# Specific test function
pytest tests/test_app.py::TestHealthEndpoint::test_health_check -v
```

### Code Quality
```bash
# Format code
black .

# Check formatting
black --check .

# Lint code
flake8 .
```

## Project Architecture

### Backend (`app.py`)
- Flask application factory pattern
- CORS enabled for cross-origin requests
- JSON-based REST API
- Error handlers for common HTTP errors

### Frontend (`frontend/`)
- `index.html`: Single-page structure
- `css/style.css`: Responsive styling with CSS variables
- `js/main.js`: Event handlers and API communication

### Tests (`tests/`)
- Unit tests for API endpoints
- Test fixtures for app client
- Coverage reporting

## Adding New Features

### 1. Backend Endpoint
```python
@app.route('/api/new-endpoint', methods=['GET', 'POST'])
def new_endpoint():
    """Endpoint description"""
    # Implementation
    return jsonify(data), 200
```

### 2. Frontend Handler
```javascript
// Add to main.js
document.getElementById('element').addEventListener('click', async () => {
    const response = await fetch('http://localhost:5000/api/new-endpoint');
    // Handle response
});
```

### 3. Add Tests
```python
def test_new_endpoint(client):
    """Test the new endpoint"""
    response = client.get('/api/new-endpoint')
    assert response.status_code == 200
```

## Database Integration (Future)

To add database support:
1. Install: `pip install flask-sqlalchemy`
2. Create `models.py` for data models
3. Update `app.py` with database initialization
4. Create migrations with Flask-Migrate

## Debugging

### Python Debugging
```python
import pdb; pdb.set_trace()  # Add breakpoint
```

### Browser Console
Press F12 to open developer tools and check console/network tabs.

### Flask Debug Mode
Enabled automatically in development. See `app.config['DEBUG']`.

## Common Issues

### "Address already in use"
Port 5000 is occupied. Either:
- Close the app using port 5000
- Change port: `app.run(port=5001)`

### "Module not found"
Ensure virtual environment is activated and dependencies are installed.

### CORS Issues
If frontend can't reach backend, verify:
- Backend is running
- Flask-CORS is imported
- Correct API URL in frontend

## Deployment

### Local Testing
```bash
python app.py
```

### Docker
```bash
docker build -t bright-bytes .
docker run -p 5000:5000 bright-bytes
```

### Docker Compose
```bash
docker-compose up
```

### Heroku
```bash
heroku login
heroku create bright-bytes
git push heroku main
```

## Performance Optimization

- Minimize frontend bundle size
- Use caching headers for static files
- Optimize database queries
- Consider API rate limiting

## Security Checklist

- [ ] Set strong `SECRET_KEY`
- [ ] Use HTTPS in production
- [ ] Validate all inputs
- [ ] Sanitize output
- [ ] Keep dependencies updated
- [ ] Use environment variables for sensitive data

## Documentation

- Keep README updated
- Comment complex code
- Update API documentation
- Add docstrings to functions

## Need Help?

- Check existing issues
- Open a new issue with details
- Review Flask and pytest documentation
- Ask in pull request reviews

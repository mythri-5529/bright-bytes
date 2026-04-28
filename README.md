# ✨ Bright Bytes

A modern, full-stack web application built with Python Flask backend and vanilla JavaScript frontend.

## Overview

Bright Bytes is a production-ready template for building full-stack web applications. It demonstrates best practices for:

- **Backend**: RESTful API with Flask, CORS support, error handling, and validation
- **Frontend**: Responsive HTML/CSS/JS with dynamic content loading and form handling
- **Testing**: Comprehensive unit tests with pytest
- **DevOps**: GitHub Actions CI/CD pipeline
- **Documentation**: Clear setup and deployment instructions

## 🚀 Features

- ✅ RESTful API endpoints with Flask
- ✅ CORS-enabled for cross-origin requests
- ✅ Responsive, modern UI with dark mode
- ✅ Dynamic data fetching and form submission
- ✅ Comprehensive error handling
- ✅ Full test suite with pytest
- ✅ Automated CI/CD pipeline
- ✅ Environment-based configuration
- ✅ Production-ready deployment setup

## 📁 Project Structure

```
bright-bytes/
├── backend/                    # Backend server code
├── frontend/                   # Frontend files
│   ├── index.html             # Main HTML page
│   ├── css/
│   │   └── style.css          # Global styles
│   └── js/
│       └── main.js            # JavaScript logic
├── tests/
│   └── test_app.py            # Unit tests
├── .github/workflows/
│   └── ci-cd.yml              # GitHub Actions workflow
├── app.py                      # Flask application entry point
├── requirements.txt            # Python dependencies
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
└── README.md                   # This file
```

## 🛠️ Prerequisites

- Python 3.9 or higher
- pip (Python package manager)
- Git
- Modern web browser

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/mythri-5529/bright-bytes.git
cd bright-bytes
```

### 2. Create Virtual Environment

```bash
# On Windows
python -m venv venv
venv\Scripts\activate

# On macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Setup Environment Variables

```bash
# Copy the example file
cp .env.example .env

# Edit .env with your settings (optional for development)
```

## 🚀 Running the Application

### Development Mode

```bash
# Make sure virtual environment is activated
python app.py
```

The application will start on `http://localhost:5000`

### Production Mode

```bash
# Using gunicorn (recommended for production)
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## 🧪 Testing

### Run All Tests

```bash
pytest tests/ -v
```

### Run Tests with Coverage Report

```bash
pytest tests/ -v --cov=. --cov-report=html
```

### Run Specific Test File

```bash
pytest tests/test_app.py -v
```

## 📡 API Endpoints

### Health Check
- **Endpoint**: `GET /api/health`
- **Description**: Check API status
- **Response**: 
  ```json
  {
    "status": "healthy",
    "message": "Bright Bytes API is running"
  }
  ```

### Get Data
- **Endpoint**: `GET /api/data`
- **Description**: Retrieve list of items
- **Response**:
  ```json
  {
    "items": [
      {
        "id": 1,
        "title": "Sample Item 1",
        "description": "This is a sample item"
      }
    ]
  }
  ```

### Create Data
- **Endpoint**: `POST /api/data`
- **Description**: Create a new item
- **Request Body**:
  ```json
  {
    "title": "New Item",
    "description": "Item description"
  }
  ```
- **Response** (201 Created):
  ```json
  {
    "id": 4,
    "title": "New Item",
    "description": "Item description"
  }
  ```

## 🎨 Frontend Features

### Navigation
- Home section with API health check
- Items manager for CRUD operations
- About section with project information

### Interactive Elements
- Health status checker
- Dynamic items list loader
- Form submission for creating items
- Real-time API communication

## 🔒 Security Features

- CORS protection
- Input validation
- Error handling and logging
- Environment-based configuration
- Secret key management

## 🚀 Deployment

### Heroku
```bash
# Create Procfile
echo "web: gunicorn app:app" > Procfile

# Deploy
git push heroku main
```

### Docker (Optional)
Create a `Dockerfile`:
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]
```

Build and run:
```bash
docker build -t bright-bytes .
docker run -p 5000:5000 bright-bytes
```

## 📊 GitHub Actions CI/CD

The project includes automated workflows that:
- Run tests on Python 3.9, 3.10, and 3.11
- Check code formatting with Black
- Lint with flake8
- Generate coverage reports
- Build the application

Workflows are triggered on:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙋 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing issues and discussions
- Review the documentation above

## 📚 Additional Resources

- [Flask Documentation](https://flask.palletsprojects.com/)
- [Flask-CORS](https://flask-cors.readthedocs.io/)
- [pytest Documentation](https://docs.pytest.org/)
- [GitHub Actions](https://github.com/features/actions)

---

**Built with ❤️ by Bright Bytes Contributors**
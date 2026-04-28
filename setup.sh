#!/bin/bash
# Bright Bytes Setup Script for macOS/Linux

echo ""
echo "========================================"
echo "   Bright Bytes - Project Setup"
echo "========================================"
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "[ERROR] Python 3 is not installed"
    echo "Please install Python 3 from https://www.python.org/downloads/"
    exit 1
fi

python3_version=$(python3 --version)
echo "[✓] Python found: $python3_version"

# Check if Git is installed
if ! command -v git &> /dev/null; then
    echo "[ERROR] Git is not installed"
    echo "Please install Git from https://git-scm.com/downloads"
    exit 1
fi

git_version=$(git --version)
echo "[✓] Git found: $git_version"

echo ""

# Create virtual environment
echo "[1/5] Creating virtual environment..."
if [ -d "venv" ]; then
    echo "Virtual environment already exists, skipping..."
else
    python3 -m venv venv
    if [ $? -ne 0 ]; then
        echo "[ERROR] Failed to create virtual environment"
        exit 1
    fi
fi
echo "[✓] Virtual environment ready"

# Activate virtual environment
echo "[2/5] Activating virtual environment..."
source venv/bin/activate
echo "[✓] Virtual environment activated"

# Install dependencies
echo "[3/5] Installing Python dependencies..."
pip install -r requirements.txt
if [ $? -ne 0 ]; then
    echo "[ERROR] Failed to install dependencies"
    exit 1
fi
echo "[✓] Dependencies installed"

# Run tests
echo "[4/5] Running tests..."
pytest tests/ -v
if [ $? -ne 0 ]; then
    echo "[WARNING] Some tests failed"
    read -p "Continue anyway? (Y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi
echo "[✓] Tests completed"

# Display success message
echo ""
echo "[5/5] Setup complete!"
echo ""
echo "========================================"
echo "   Next Steps:"
echo "========================================"
echo ""
echo "To run the application:"
echo "   1. Activate virtual environment:"
echo "      source venv/bin/activate"
echo "   2. Start the server:"
echo "      python app.py"
echo "   3. Open browser to http://localhost:5000"
echo ""
echo "To run tests:"
echo "   pytest tests/ -v"
echo ""
echo "To set up Git and push to GitHub:"
echo "   git config user.name 'Your Name'"
echo "   git config user.email 'your.email@example.com'"
echo "   git add ."
echo "   git commit -m 'Initial commit'"
echo "   git remote add origin https://github.com/YOUR_USERNAME/bright-bytes.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""

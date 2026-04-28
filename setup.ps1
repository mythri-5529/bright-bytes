# Bright Bytes Setup Script for PowerShell
# This script sets up the project after Python and Git are installed

Write-Host ""
Write-Host "========================================"
Write-Host "   Bright Bytes - Project Setup"
Write-Host "========================================"
Write-Host ""

# Check if Python is installed
try {
    $pythonVersion = python --version 2>&1
    Write-Host "[✓] Python found: $pythonVersion"
} catch {
    Write-Host "[ERROR] Python is not installed or not in PATH"
    Write-Host "Please install Python from https://www.python.org/downloads/"
    Write-Host "Make sure to check 'Add Python to PATH' during installation"
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if Git is installed
try {
    $gitVersion = git --version 2>&1
    Write-Host "[✓] Git found: $gitVersion"
} catch {
    Write-Host "[ERROR] Git is not installed or not in PATH"
    Write-Host "Please install Git from https://git-scm.com/download/win"
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""

# Create virtual environment
Write-Host "[1/5] Creating virtual environment..."
if (Test-Path "venv") {
    Write-Host "Virtual environment already exists, skipping..."
} else {
    python -m venv venv
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] Failed to create virtual environment"
        Read-Host "Press Enter to exit"
        exit 1
    }
}
Write-Host "[✓] Virtual environment ready"

# Activate virtual environment
Write-Host "[2/5] Activating virtual environment..."
& "venv\Scripts\Activate.ps1"
Write-Host "[✓] Virtual environment activated"

# Install dependencies
Write-Host "[3/5] Installing Python dependencies..."
pip install -r requirements.txt
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Failed to install dependencies"
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "[✓] Dependencies installed"

# Run tests
Write-Host "[4/5] Running tests..."
pytest tests/ -v
if ($LASTEXITCODE -ne 0) {
    Write-Host "[WARNING] Some tests failed"
    $choice = Read-Host "Continue anyway? (Y/N)"
    if ($choice -ne "Y") {
        exit 1
    }
}
Write-Host "[✓] Tests completed"

# Display success message
Write-Host ""
Write-Host "[5/5] Setup complete!"
Write-Host ""
Write-Host "========================================"
Write-Host "   Next Steps:"
Write-Host "========================================"
Write-Host ""
Write-Host "To run the application:"
Write-Host "   1. Activate virtual environment:"
Write-Host "      venv\Scripts\Activate.ps1"
Write-Host "   2. Start the server:"
Write-Host "      python app.py"
Write-Host "   3. Open browser to http://localhost:5000"
Write-Host ""
Write-Host "To run tests:"
Write-Host "   pytest tests/ -v"
Write-Host ""
Write-Host "To set up Git and push to GitHub:"
Write-Host "   git config user.name 'Your Name'"
Write-Host "   git config user.email 'your.email@example.com'"
Write-Host "   git add ."
Write-Host "   git commit -m 'Initial commit'"
Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/bright-bytes.git"
Write-Host "   git branch -M main"
Write-Host "   git push -u origin main"
Write-Host ""
Read-Host "Press Enter to exit"

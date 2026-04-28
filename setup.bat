@echo off
REM Bright Bytes Setup Script for Windows
REM This script sets up the project after Python and Git are installed

echo.
echo ========================================
echo   Bright Bytes - Project Setup
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python is not installed or not in PATH
    echo Please install Python from https://www.python.org/downloads/
    echo Make sure to check "Add Python to PATH" during installation
    pause
    exit /b 1
)

REM Check if Git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Git is not installed or not in PATH
    echo Please install Git from https://git-scm.com/download/win
    pause
    exit /b 1
)

echo [✓] Python found: 
python --version
echo [✓] Git found:
git --version
echo.

REM Create virtual environment
echo [1/5] Creating virtual environment...
if exist venv (
    echo Virtual environment already exists, skipping...
) else (
    python -m venv venv
    if errorlevel 1 (
        echo [ERROR] Failed to create virtual environment
        pause
        exit /b 1
    )
)
echo [✓] Virtual environment ready

REM Activate virtual environment
echo [2/5] Activating virtual environment...
call venv\Scripts\activate.bat
echo [✓] Virtual environment activated

REM Install dependencies
echo [3/5] Installing Python dependencies...
pip install -r requirements.txt
if errorlevel 1 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)
echo [✓] Dependencies installed

REM Run tests
echo [4/5] Running tests...
pytest tests/ -v
if errorlevel 1 (
    echo [WARNING] Some tests failed
    echo Continue anyway? (Y/N)
    set /p choice=
    if /i not "%choice%"=="Y" exit /b 1
)
echo [✓] Tests completed

REM Display success message
echo.
echo [5/5] Setup complete!
echo.
echo ========================================
echo   Next Steps:
echo ========================================
echo.
echo To run the application:
echo   1. Activate virtual environment:
echo      venv\Scripts\activate
echo   2. Start the server:
echo      python app.py
echo   3. Open browser to http://localhost:5000
echo.
echo To run tests:
echo   pytest tests/ -v
echo.
echo To set up Git and push to GitHub:
echo   git config user.name "Your Name"
echo   git config user.email "your.email@example.com"
echo   git add .
echo   git commit -m "Initial commit"
echo   git remote add origin https://github.com/YOUR_USERNAME/bright-bytes.git
echo   git branch -M main
echo   git push -u origin main
echo.
pause

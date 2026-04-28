# Quick Setup Instructions

## Prerequisites

You need to install these first:

1. **Python 3.9+** 
   - Download: https://www.python.org/downloads/
   - ⚠️ **IMPORTANT**: Check "Add Python to PATH" during installation
   - Verify: Open PowerShell and run `python --version`

2. **Git**
   - Download: https://git-scm.com/download/win
   - Use default settings
   - Verify: Open PowerShell and run `git --version`

## Setup Options

### Option 1: Automated Setup (Recommended)

After installing Python and Git, double-click one of these:

- **Windows (Command Prompt)**: `setup.bat`
- **Windows (PowerShell)**: Right-click `setup.ps1` → "Run with PowerShell"
- **macOS/Linux**: `bash setup.sh`

This will automatically:
- Create virtual environment
- Install dependencies
- Run tests
- Show next steps

### Option 2: Manual Setup

After installing Python and Git:

```powershell
# Navigate to project
cd "c:\Users\renuk\OneDrive\ドキュメント\GitHub\bright-bytes"

# Create virtual environment
python -m venv venv

# Activate it
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run tests
pytest tests/ -v

# Start the app
python app.py
```

Then open http://localhost:5000 in your browser.

## Troubleshooting

### "Python not found"
- Reinstall Python
- Make sure "Add Python to PATH" is checked
- Restart your terminal after installation

### "Git not found"
- Install Git from https://git-scm.com/download/win
- Restart your terminal after installation

### "pip not found"
- Python wasn't added to PATH
- Reinstall Python and check "Add Python to PATH"

### Virtual environment won't activate
Try: `venv\Scripts\Activate.ps1`
Or in Command Prompt: `venv\Scripts\activate.bat`

## Next Steps After Setup

1. **Run the app**: `python app.py`
2. **Visit**: http://localhost:5000
3. **Push to GitHub**:
   ```powershell
   git init
   git config user.name "Your Name"
   git config user.email "your.email@example.com"
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/bright-bytes.git
   git branch -M main
   git push -u origin main
   ```

## Testing

Run tests anytime:
```powershell
pytest tests/ -v
```

With coverage report:
```powershell
pytest tests/ -v --cov=. --cov-report=html
```

## Docker Alternative

If you prefer Docker (no Python install needed):
```powershell
docker-compose up
```

Visit http://localhost:5000

---

**Need help?** Check the README.md or DEVELOPMENT.md files!

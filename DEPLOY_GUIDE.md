# 🚀 Deployment Guide - PythonAnywhere

## Step 1: Create GitHub Repository

1. Go to: https://github.com/new
2. Repository name: `portfolio`
3. Description: `Modern Flutter & Backend Developer Portfolio`
4. Visibility: **Public**
5. Click **"Create repository"**

## Step 2: Push Code to GitHub

```bash
git remote set-url origin https://github.com/shidos5/portfolio.git
git push -u origin main
```

If it asks for credentials:
- Username: `shidos5`
- Password: Use a Personal Access Token from https://github.com/settings/tokens

## Step 3: Deploy on PythonAnywhere

### A. Sign Up
1. Go to: https://www.pythonanywhere.com/registration/register/beginner/
2. Create FREE account (no credit card needed!)
3. Verify your email

### B. Clone Your Repository
1. Click **"Consoles"** tab
2. Click **"Bash"**
3. Run these commands:

```bash
git clone https://github.com/shidos5/portfolio.git
cd portfolio
pip3.10 install --user -r requirements.txt
```

### C. Create Web App
1. Go to **"Web"** tab
2. Click **"Add a new web app"**
3. Click **"Next"** (accept free domain)
4. Choose **"Manual configuration"**
5. Choose **"Python 3.10"**
6. Click **"Next"**

### D. Configure WSGI File
1. In the Web tab, find **"Code"** section
2. Click on the **WSGI configuration file** link (e.g., `/var/www/yourusername_pythonanywhere_com_wsgi.py`)
3. **Delete everything** in the file
4. Replace with this code (change `yourusername` to your actual username):

```python
import sys
import os

# Add your project directory to the sys.path
project_home = '/home/yourusername/portfolio'
if project_home not in sys.path:
    sys.path.insert(0, project_home)

# Set environment variables
os.environ['SECRET_KEY'] = 'your-secret-key-here-change-this'

# Import Flask app
from app import app as application
```

5. Click **"Save"**

### E. Set Static Files
1. In the Web tab, scroll to **"Static files"** section
2. Add these mappings:

| URL | Directory |
|-----|-----------|
| `/static/` | `/home/yourusername/portfolio/static/` |

### F. Set Working Directory
1. In **"Code"** section:
   - **Source code**: `/home/yourusername/portfolio`
   - **Working directory**: `/home/yourusername/portfolio`

### G. Reload and Launch
1. Scroll to top
2. Click the big green **"Reload"** button
3. Click on your URL: `yourusername.pythonanywhere.com`

## 🎉 Done!

Your portfolio is now live at: `https://yourusername.pythonanywhere.com`

## 🔄 How to Update

Whenever you make changes locally:

```bash
git add -A
git commit -m "Your update message"
git push
```

Then on PythonAnywhere:
1. Go to **"Consoles"** → **"Bash"**
2. Run:
```bash
cd portfolio
git pull
```
3. Go to **"Web"** tab
4. Click **"Reload"**

## 🆘 Troubleshooting

**Error: "ImportError: No module named flask"**
- Run in Bash console: `pip3.10 install --user Flask`

**Error: "Application object must be callable"**
- Check WSGI file has `from app import app as application`

**Static files not loading**
- Verify static files mapping in Web tab
- Make sure path is `/home/yourusername/portfolio/static/`

**500 Internal Server Error**
- Check error log in Web tab
- Look for Python errors
- Make sure SECRET_KEY is set in WSGI file

## 📧 Need Help?

Check PythonAnywhere forums: https://www.pythonanywhere.com/forums/

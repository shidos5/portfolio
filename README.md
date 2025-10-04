# Flutter Developer Portfolio (Flask)

A sleek, animated portfolio site for a Flutter and Backend (Flask/Python) developer.

## Features
- Modern dark theme with Flutter Blue and Cyan accents
- Subtle animations: scroll reveal, floating particle background
- Project listing powered by `data/projects.json`
- Contact form that stores messages to `data/contact_messages.json`
- Easy configuration via `data/config.json`

## Quickstart (Windows)
1. Python 3.10+ recommended
2. Create venv
   ```powershell
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1
   ```
3. Install deps
   ```powershell
   pip install -r requirements.txt
   ```
4. Run
   ```powershell
   set FLASK_APP=app.py
   set FLASK_ENV=development
   flask run
   ```
   App runs at http://127.0.0.1:5000

## Customize
- Update profile: `data/config.json`
- Add projects: `data/projects.json`
- Branding: edit `static/css/style.css`
- Templates: `templates/`

## Deploy
- Any Python host works (Railway, Render, Fly.io). Ensure `SECRET_KEY` is set.

## Notes
- Contact messages are stored locally in `data/contact_messages.json`. For production, use a DB or email service.

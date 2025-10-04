import os
import json
from datetime import datetime
from flask import Flask, render_template, request, redirect, url_for, flash


def ensure_file(path: str, default_content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    if not os.path.exists(path):
        with open(path, 'w', encoding='utf-8') as f:
            if isinstance(default_content, (dict, list)):
                json.dump(default_content, f, indent=2)
            else:
                f.write(str(default_content))


def read_json(path: str, default):
    ensure_file(path, default)
    try:
        with open(path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception:
        return default


def write_json(path: str, data):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, 'data')
PROJECTS_FILE = os.path.join(DATA_DIR, 'projects.json')
CONTACTS_FILE = os.path.join(DATA_DIR, 'contact_messages.json')
CONFIG_FILE = os.path.join(DATA_DIR, 'config.json')

# Ensure base data files
ensure_file(PROJECTS_FILE, [])
ensure_file(CONTACTS_FILE, [])
ensure_file(CONFIG_FILE, {
    "owner": {
        "name": "Your Name",
        "role": "Flutter Developer · Backend (Flask/Python)",
        "location": "Your City",
        "email": "you@example.com",
        "github": "https://github.com/yourhandle",
        "linkedin": "https://www.linkedin.com/in/yourhandle/"
    }
})

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-change-me')


@app.context_processor
def inject_owner():
    cfg = read_json(CONFIG_FILE, {})
    return dict(owner=cfg.get('owner', {}))


@app.route('/')
def index():
    projects = read_json(PROJECTS_FILE, [])[:6]
    return render_template('index.html', projects=projects)


@app.route('/projects')
def projects():
    projects = read_json(PROJECTS_FILE, [])
    return render_template('projects.html', projects=projects)


@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form.get('name', '').strip()
        email = request.form.get('email', '').strip()
        message = request.form.get('message', '').strip()

        if not name or not email or not message:
            flash('Please fill out all fields.', 'error')
            return redirect(url_for('contact'))

        entries = read_json(CONTACTS_FILE, [])
        entries.append({
            'name': name,
            'email': email,
            'message': message,
            'ts': datetime.utcnow().isoformat() + 'Z',
            'ip': request.headers.get('X-Forwarded-For', request.remote_addr)
        })
        write_json(CONTACTS_FILE, entries)
        flash('Thanks! Your message has been sent.', 'success')
        return redirect(url_for('contact'))

    return render_template('contact.html')


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('FLASK_ENV') == 'development'
    app.run(host='0.0.0.0', port=port, debug=debug)

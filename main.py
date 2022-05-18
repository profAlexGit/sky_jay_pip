import flask_login
from flask import Flask, render_template, request
from flask_login import LoginManager, login_user, current_user, login_required, logout_user
from werkzeug.utils import redirect

from data import db_session

app = Flask(__name__)
app.config['SECRET_KEY'] = 'sky_jay_secret_key'


@app.route('/')
def index():
    return render_template('main_page.html')


@app.route('/diary')
def diary():
    return render_template('diary.html')


@app.route('/diary/date')
def diary_date():
    return render_template('diary_date.html')


@app.route('diary/date/createnote')
def create_note():
    return render_template('createnote.html')


def main():
    db_session.global_init("db/sky_jay.db")


if __name__ == '__main__':
    main()
    app.run(port=8000, host='127.0.0.1')

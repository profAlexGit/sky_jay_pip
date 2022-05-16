import flask_login
from flask import Flask, render_template, request
from flask_login import LoginManager, login_user, current_user, login_required, logout_user
from werkzeug.utils import redirect

from data import db_session

app = Flask(__name__)
app.config['SECRET_KEY'] = 'sky_jay_secret_key'


@app.route('/')
def index():
    return render_template('attempt.html')


def main():
    db_session.global_init("db/sky_jay.db")


if __name__ == '__main__':
    main()
    app.run(port=8000, host='127.0.0.1')

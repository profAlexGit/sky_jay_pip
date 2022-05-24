import flask_login
from flask import Flask, render_template, request
from flask_login import LoginManager, login_user, current_user, login_required, logout_user
from werkzeug.utils import redirect

from data import db_session, user

app = Flask(__name__)
app.config['SECRET_KEY'] = 'sky_jay_secret_key'


@app.route('/registration')  # Страница которая перенаправляет на регистрацию пользователя или психолога
def registrationStage_1():
    return render_template('registration_page1.html')


@app.route('/registration/psychologist', methods=['GET', 'POST'])  # Страница регистрации психолога
def registrationStage_2_Psycho():
    if request.method == 'GET':
        return 'Здесь будет страница регистрации психолога'
    elif request.method == 'POST':
        user = user.createUserModel(_isUser=False)
        if not (user is None):
            session = db_session.create_session()
            session.add(user)
            session.commit()
            session.close()
            return redirect('/all-users')
        else:  # Тестовая страница
            return \
                '<!DOCTYPE html><div style="background-color: gray;">' \
                '<h2>Такой пользователь уже существует!</h2></div>' \
                '<a href="/all-users">Просмотреть всех пользователей</a>'


@app.route('/registration/user', methods=['GET', 'POST'])  # Страница регистрации пользователя
def registrationStage_2_User():
    if request.method == 'GET':
        return render_template('registration.html')
    elif request.method == 'POST':
        user = user.createUserModel(_isUser=True)
        session = db_session.create_session()
        session.add(user)
        session.commit()
        session.close()
        return redirect('/all-users')


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/registration/confirmation')
def registration_confirmation():
    return render_template('registration_confirmation.html')


@app.route('/diary')
def diary():
    return render_template('diary.html')


@app.route('/diary/date')
def diary_date():
    return render_template('diary_date.html')


@app.route('/diary/date/createnote')
def create_note():
    return render_template('createnote.html')


def main():
    db_session.global_init("db/sky_jay.db")


if __name__ == '__main__':
    main()
    app.run(port=8000, host='127.0.0.1')

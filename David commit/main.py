import flask_login
from flask import Flask, render_template, request
from flask_login import LoginManager, login_user, current_user, login_required, logout_user
from werkzeug.utils import redirect

from data import db_session
from data import models

app = Flask(__name__)
app.config['SECRET_KEY'] = 'sky_jay_secret_key'  # Зачем нужен SECRET_KEY?


# Methods
def clearDB():
    """
    Функция удаляющая всех пользователей из БД
    """

    session = db_session.create_session()
    all_ = session.query(models.User).all()
    for user in all_:
        session.delete(user)
    session.commit()
    session.close()


# Routes
@app.route('/')
def index():
    return render_template('index.html')


@app.route('/all-users')
def allUsers():
    """
    Отображает всех пользователей из БД
    """

    session = db_session.create_session()
    users = session.query(models.User).all()
    session.close()

    return render_template('all-users.html', users=users)


@app.route('/registration')
def registrationStage_1():
    """
    Страница которая перенаправляет на регистрацию пользователя или психолога
    """

    return render_template('registration_page1.html')


@app.route('/psycho-registration', methods=['GET', 'POST'])
def registrationStage_2_Psycho():
    """
    Страница регистрации психолога

    После успешной регистрации перенаправляет "http://127.0.0.1:8000/all-users"
    """

    if request.method == 'GET':
        return render_template('registration_page2.html')

    elif request.method == 'POST':
        user = models.createUserModel(_isUser=False)

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


@app.route('/user-registration', methods=['GET', 'POST'])
def registrationStage_2_User():
    """
    Страница регистрации пользователя

    После успешной регистрации перенаправляет "http://127.0.0.1:8000/all-users"
    """

    if request.method == 'GET':
        return render_template('registration_page2.html')

    elif request.method == 'POST':
        user = models.createUserModel(_isUser=True)

        session = db_session.create_session()
        session.add(user)
        session.commit()
        session.close()

        return redirect('/all-users')


# Start server
def main():
    db_session.global_init("db/sky_jay.db")


if __name__ == '__main__':
    main()
    app.run(port=8000, host='127.0.0.1')

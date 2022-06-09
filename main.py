import flask_login
from flask import Flask, render_template, request
from flask_login import LoginManager, login_user, current_user, login_required, logout_user
from werkzeug.utils import redirect

from data import db_session, user
from data.user import User
from forms.login_form import LoginForm
from forms.register_form import RegisterForm

app = Flask(__name__)
app.config['SECRET_KEY'] = 'sky_jay_secret_key'
login_manager = LoginManager()
login_manager.init_app(app)


@app.route('/registration/psychologist', methods=['GET', 'POST'])  # Страница регистрации психолога
def registration_psychologist():
    pass


@app.route('/registration/user', methods=['GET', 'POST'])
def registration_user():
    form = RegisterForm()
    if form.validate_on_submit():
        if form.password.data != form.password_again.data:
            return render_template('auth/registration.html', title='Регистрация',
                                   form=form,
                                   message="Пароли не совпадают")
        db_sess = db_session.create_session()
        if db_sess.query(User).filter(User.email == form.email.data).first():
            return render_template('auth/registration.html', title='Регистрация',
                                   form=form,
                                   message="Такой пользователь уже есть")
        user = User(
            name=form.name.data,
            surname=form.surname.data,
            email=form.email.data,
            date_birth=form.date_birth.data,
            place_residence=form.place_residence.data,
            isUser=False,
        )
        user.set_password(form.password.data)
        db_sess.add(user)
        db_sess.commit()
        return redirect('/login')
    return render_template('auth/registration.html', title='Регистрация', form=form)


@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        db_sess = db_session.create_session()
        user = db_sess.query(User).filter(User.email == form.email.data).first()
        if user and user.check_password(form.password.data):
            login_user(user)
            return redirect("/")
        return render_template('auth/login.html',
                               message="Неправильный логин или пароль",
                               form=form)
    return render_template('auth/login.html', title='Авторизация', form=form)


@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect("/")


@login_manager.user_loader
def load_user(user_id):
    db_sess = db_session.create_session()
    return db_sess.query(User).get(user_id)


@app.route('/', methods=['POST', 'GET'])
def index():
    return render_template('index.html')


@app.route('/registration/confirmation')
def registration_confirmation():
    return render_template('auth/registration_confirmation.html')


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
    app.run(port=5000, host='127.0.0.1')

from flask_wtf import FlaskForm
from wtforms import PasswordField, SubmitField, EmailField


class LoginForm(FlaskForm):
    email = EmailField('Почта')
    password = PasswordField('Пароль')
    submit = SubmitField('Войти')
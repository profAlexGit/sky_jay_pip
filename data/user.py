import sqlalchemy as sa

from .db_session import SqlAlchemyBase


class User(SqlAlchemyBase):
    __tablename__ = 'user'

    id = sa.Column(sa.Integer, primary_key=True)
    isUser = sa.Column(sa.Boolean, nullable=False)
    name = sa.Column(sa.String(50), nullable=False)
    surname = sa.Column(sa.String(60), nullable=False)
    dateBirth = sa.Column(sa.String(20), nullable=False)
    placeResidence = sa.Column(sa.String(100), default='None')
    password = sa.Column(sa.BLOB, nullable=False)
    email = sa.Column(sa.String(100), nullable=False)


def createUserModel(_isUser: bool = True) -> User:
    """
    Функция создающая экземпляр класса User и собирающая данные с формы регистрации
    для внесения данных в БД

    _isUser - Параметр отвечающий за определение пользователя. Если False то психолог, иначе пользователь
    """

    from werkzeug.security import generate_password_hash
    from flask import request

    password = generate_password_hash(request.form['password']).encode('utf-8')
    name = request.form['name']
    surname = request.form['surname']
    placeResidence = request.form['placeResidence']
    dateBirth = request.form['dateBirth']
    email = request.form['email']

    user = User(
        isUser=_isUser, name=name, surname=surname, placeResidence=placeResidence, dateBirth=dateBirth,
        password=password, email=email)

    return user

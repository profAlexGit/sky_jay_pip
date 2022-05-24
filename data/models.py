"""
Файл хранящий все модели для создания таблиц в БД
"""

import sqlalchemy as sa
from flask import request

from .db_session import SqlAlchemyBase


# Models
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


# Methods
def createUserModel(_isUser: bool = True) -> User:
    """
    Функция создающая экземпляр класса User и собирающая данные с формы регистрации
    для внесения данных в БД

    _isUser - Параметр отвечающий за определение пользователя. Если False то психолог, иначе пользователь
    password - кэшированный пароль (надёжная защита)
    salt - Какая-то соль) (как написано в интернете так и сделал)
    """

    import os
    import hashlib

    salt = os.urandom(32)
    password = hashlib.pbkdf2_hmac(hash_name='sha256', password=request.form['password'].encode('utf-8'), salt=salt,
                                   iterations=100000, dklen=64)

    name = request.form['name']
    surname = request.form['surname']
    placeResidence = request.form['placeResidence']
    dateBirth = request.form['dateBirth']
    email = request.form['email']

    user = User(
        isUser=_isUser, name=name, surname=surname, placeResidence=placeResidence, dateBirth=dateBirth,
        password=password, email=email)

    return user


def spamUsers(stop: int = 1000, _start: int = 0):
    from . import db_session
    from time import perf_counter

    start = perf_counter()

    session = db_session.create_session()
    print('Starting spam...')
    for i in range(_start, stop):
        isUser = True if i % 2 == 0 else False

        user = User(isUser=isUser, name=str(i), surname=str(i), dateBirth=str(i).ljust(10, '0'),
                    placeResidence=str(i).rjust(10, '0'), password=str(i).ljust(10, '0').rjust(20, '1').encode('utf-8'),
                    email=f'test{str(i).rjust(5, "0")}@example.com')

        session.add(user)

    session.commit()
    session.close()

    end = perf_counter() - start
    print(f"Time: {end=}")

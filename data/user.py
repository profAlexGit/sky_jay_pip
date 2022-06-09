import sqlalchemy
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

from .db_session import SqlAlchemyBase


class User(SqlAlchemyBase, UserMixin):
    __tablename__ = 'users'

    id = sqlalchemy.Column(sqlalchemy.Integer,
                           primary_key=True, autoincrement=True)
    isUser = sqlalchemy.Column(sqlalchemy.Boolean, nullable=False)
    name = sqlalchemy.Column(sqlalchemy.String(50), nullable=False)
    surname = sqlalchemy.Column(sqlalchemy.String(60), nullable=False)
    email = sqlalchemy.Column(sqlalchemy.String(20),
                              index=True, unique=True, nullable=False)
    date_birth = sqlalchemy.Column(sqlalchemy.String(20), nullable=False)
    place_residence = sqlalchemy.Column(sqlalchemy.String(100), default='None')
    password = sqlalchemy.Column(sqlalchemy.String, nullable=True)

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

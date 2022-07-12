from datetime import datetime

import sqlalchemy
from flask_login import UserMixin
from sqlalchemy import orm
from werkzeug.security import generate_password_hash, check_password_hash

from .db_session import SqlAlchemyBase


class User(SqlAlchemyBase, UserMixin):
    __tablename__ = 'users'

    id = sqlalchemy.Column(sqlalchemy.Integer,
                           primary_key=True, autoincrement=True)
    name = sqlalchemy.Column(sqlalchemy.String(30), nullable=False)
    surname = sqlalchemy.Column(sqlalchemy.String(60), nullable=False)
    email = sqlalchemy.Column(sqlalchemy.String(30),
                              index=True, unique=True, nullable=False)
    date_birth = sqlalchemy.Column(sqlalchemy.String(20), nullable=False)
    place_residence = sqlalchemy.Column(sqlalchemy.String(100), default='None', nullable=True)
    password = sqlalchemy.Column(sqlalchemy.String, nullable=False)
    avatar = sqlalchemy.Column(sqlalchemy.String, default='/static/img/avatar-user-02.png', nullable=False)
    blocked = sqlalchemy.Column(sqlalchemy.Boolean, default=False, nullable=False)
    confirmed = sqlalchemy.Column(sqlalchemy.Boolean, default=False, nullable=False)
    notes = orm.relation('Notes', back_populates='user')
    order = orm.relation('Orders', back_populates='user')
    message = orm.relation('Messages', back_populates='user')

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)


class Psychologist(SqlAlchemyBase):
    __tablename__ = 'psychologists'
    psycho_id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True, autoincrement=True)
    name = sqlalchemy.Column(sqlalchemy.String(30), nullable=False)
    surname = sqlalchemy.Column(sqlalchemy.String(30), nullable=False)
    email = sqlalchemy.Column(sqlalchemy.String(30), nullable=False)
    password = sqlalchemy.Column(sqlalchemy.String, nullable=False)
    avatar = sqlalchemy.Column(sqlalchemy.String, nullable=False, default='')
    specialization = sqlalchemy.Column(sqlalchemy.String(70), nullable=False)
    experience = sqlalchemy.Column(sqlalchemy.String(20), nullable=False)
    price = sqlalchemy.Column(sqlalchemy.Integer, nullable=False)
    about = sqlalchemy.Column(sqlalchemy.Text(100), nullable=False)
    profile_views_amount = sqlalchemy.Column(sqlalchemy.Integer, nullable=False)
    confirmed = sqlalchemy.Column(sqlalchemy.Boolean, default=False)
    blocked = sqlalchemy.Column(sqlalchemy.Boolean, default=False)
    videos = orm.relation('Videos', back_populates='psycho')
    order = orm.relation('Orders', back_populates='psycho')
    chats = orm.relation('Chats', back_populates='psycho')
    message = orm.relation('Messages', back_populates='psycho')
    docs = orm.relation("PsychologistsDocs", back_populates='psycho')

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)


class PsychologistsDocs(SqlAlchemyBase):
    __tablename__ = 'psychologists_docs'
    psycho_id = sqlalchemy.Column(sqlalchemy.Integer, sqlalchemy.ForeignKey('psychologists.psycho_id'))
    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True, autoincrement=True)
    doc = sqlalchemy.Column(sqlalchemy.String, nullable=False)
    psycho = orm.relation('Psychologist')


class Videos(SqlAlchemyBase):
    __tablename__ = 'videos'
    psycho_id = sqlalchemy.Column(sqlalchemy.Integer, sqlalchemy.ForeignKey('psychologists.psycho_id'))
    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True, autoincrement=True)
    video = sqlalchemy.Column(sqlalchemy.String)
    title = sqlalchemy.Column(sqlalchemy.String(30), nullable=False)
    description = sqlalchemy.Column(sqlalchemy.Text(200), nullable=True)
    cover = sqlalchemy.Column(sqlalchemy.String)
    date_time = sqlalchemy.Column(sqlalchemy.DateTime, default=datetime.now)
    psycho = orm.relation('Psychologist')
    statistics = orm.relation('Statistics', back_populates='video')


class Notes(SqlAlchemyBase):
    __tablename__ = "notes"
    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True, autoincrement=True)
    user_id = sqlalchemy.Column(sqlalchemy.Integer, sqlalchemy.ForeignKey("users.id"))
    date_time = sqlalchemy.Column(sqlalchemy.DateTime, default=datetime.now)
    content = sqlalchemy.Column(sqlalchemy.Text(3000), nullable=False)
    font_size = sqlalchemy.Column(sqlalchemy.Integer, default=14)
    picture = sqlalchemy.Column(sqlalchemy.String)
    font_type = sqlalchemy.Column(sqlalchemy.Integer)
    user = orm.relation("User")


class Orders(SqlAlchemyBase):
    __tablename__ = 'orders'
    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True, autoincrement=True)
    user_id = sqlalchemy.Column(sqlalchemy.Integer, sqlalchemy.ForeignKey("users.id"))
    psycho_id = sqlalchemy.Column(sqlalchemy.Integer, sqlalchemy.ForeignKey('psychologists.psycho_id'))
    sqlalchemy.Column(sqlalchemy.Integer, sqlalchemy.ForeignKey("users.id"))
    client_price = sqlalchemy.Column(sqlalchemy.Integer)
    amount = sqlalchemy.Column(sqlalchemy.Integer)
    order_date = sqlalchemy.Column(sqlalchemy.DateTime, default=datetime.now)
    status = sqlalchemy.Column(sqlalchemy.Integer)
    user = orm.relation('User')
    psycho = orm.relation('Psychologist')


class Statistics(SqlAlchemyBase):
    __tablename__ = 'statistics'
    video_id = sqlalchemy.Column(sqlalchemy.Integer, sqlalchemy.ForeignKey('videos.id'), primary_key=True)
    likes = sqlalchemy.Column(sqlalchemy.Integer)
    views = sqlalchemy.Column(sqlalchemy.Integer)
    video = orm.relation('Videos')


class Messages(SqlAlchemyBase):
    __tablename__ = 'messages'
    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True, autoincrement=True)
    user_id = sqlalchemy.Column(sqlalchemy.Integer, sqlalchemy.ForeignKey("users.id"))
    psycho_id = sqlalchemy.Column(sqlalchemy.Integer, sqlalchemy.ForeignKey('psychologists.psycho_id'))
    message = sqlalchemy.Column(sqlalchemy.Text(1500))
    message_time = sqlalchemy.Column(sqlalchemy.DateTime, default=datetime.now)
    chat_id = sqlalchemy.Column(sqlalchemy.Integer, sqlalchemy.ForeignKey('chats.chat_id'))
    user = orm.relation("User")
    psycho = orm.relation('Psychologist')
    chat = orm.relation('Chats')


class Chats(SqlAlchemyBase):
    __tablename__ = 'chats'
    chat_id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True, autoincrement=True)
    admin_id = sqlalchemy.Column(sqlalchemy.Integer, sqlalchemy.ForeignKey('psychologists.psycho_id'))
    whats_this = sqlalchemy.Column(sqlalchemy.Boolean)
    name = sqlalchemy.Column(sqlalchemy.String(50))
    users = sqlalchemy.Column(sqlalchemy.String)
    about = sqlalchemy.Column(sqlalchemy.Text(100))
    avatar = sqlalchemy.Column(sqlalchemy.String)
    psycho = orm.relation('Psychologist')
    message = orm.relation('Messages', back_populates='chat')

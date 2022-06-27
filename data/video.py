import sqlalchemy

from .db_session import SqlAlchemyBase


class Video(SqlAlchemyBase):
    __tablename__ = 'video'

    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True, autoincrement=True)
    user_id = sqlalchemy.Column(sqlalchemy.Integer, nullable=False)
    video = sqlalchemy.Column(sqlalchemy.String, nullable=False)
    cover = sqlalchemy.Column(sqlalchemy.String, nullable=False)
    title = sqlalchemy.Column(sqlalchemy.String(100), nullable=False)
    description = sqlalchemy.Column(sqlalchemy.Text(500), default='Описание отсутствует')

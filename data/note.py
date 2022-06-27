import sqlalchemy

from .db_session import SqlAlchemyBase


class Note(SqlAlchemyBase):
    __tablename__ = 'note'

    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True, autoincrement=True)
    user_id = sqlalchemy.Column(sqlalchemy.Integer, nullable=False)
    date = sqlalchemy.Column(sqlalchemy.DateTime, nullable=False)
    text = sqlalchemy.Column(sqlalchemy.Text, default='')
    image = sqlalchemy.Column(sqlalchemy.String, default='')

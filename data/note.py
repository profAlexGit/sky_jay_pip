import sqlalchemy as sa

from .db_session import SqlAlchemyBase


class Note(SqlAlchemyBase):
    __tablename__ = 'note'

    id = sa.Column(sa.Integer, primary_key=True)
    user_id = sa.Column(sa.Integer, nullable=False)
    date = sa.Column(sa.DateTime, nullable=False)
    text = sa.Column(sa.Text, default='Нет текста')
    image = sa.Column(sa.String, default='Нет')


def createNoteModel(user_id: int, date, text: str = 'Нет текста', image: str = 'Нет') -> Note:
    """
    Функция создающая и возвращающая модель Note

    user_id - Идентификатор пользователя
    date - Дата
    text - Текст заметки
    image - Путь к картинке если она есть
    """

    note = Note(user_id=user_id, date=date, text=text, image=image)
    return note

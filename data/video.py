import sqlalchemy as sa

from .db_session import SqlAlchemyBase


class Video(SqlAlchemyBase):
    __tablename__ = 'video'

    id = sa.Column(sa.Integer, primary_key=True)
    user_id = sa.Column(sa.Integer, nullable=False)
    video = sa.Column(sa.String, nullable=False)
    cover = sa.Column(sa.String, nullable=False)
    title = sa.Column(sa.String, nullable=False)
    description = sa.Column(sa.Text, default='Описание отсутствует')


def createVideoModel(user_id: int, video_path: str, cover_path: str, title: str,
                     description: str = 'Описание отсутствует') -> Video:
    """
    Функция создающая и возвращающая экземпляр класса Video

    user_id - Идентификатор пользователя привязывающийся к видео
    video_path - Путь к видео которое будет отображаться на странице
    cover_path - Путь к картинке обложке видео
    title - Название видео
    description - Описание видео
    """

    video = Video(user_id=user_id, video=video_path, cover=cover_path, title=title, description=description)
    return video

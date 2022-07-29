from flask_wtf import FlaskForm
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileRequired, FileAllowed
from wtforms import SubmitField, validators, DateField, StringField


class DiaryForm(FlaskForm):
    date = DateField('Выберите дату', format='%Y-%m-%d', validators=[DataRequired()])
    text = StringField('Расскажите о выбранной дате')
    picture = FileField('Добавить рисунок', validators=[FileRequired(), 
                                                        FileAllowed(['jpg', 'png', 'jpeg', 'ico'])])
    submit = SubmitField('Создать запись')

from flask_wtf import FlaskForm
from wtforms import SubmitField, validators, TextAreaField


class EditRecord(FlaskForm):
    text = TextAreaField('Введите текст', [validators.optional(), validators.length(max=500)])
    submit = SubmitField('Сохранить')

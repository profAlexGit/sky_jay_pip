"""def clearDB():  # Функция, удаляющая всех пользователей из БД
    session = db_session.create_session()
    all_ = session.query(models.User).all()
    for user in all_:
        session.delete(user)
    session.commit()
    session.close()


@app.route('/all-users')
def allUsers():
    Отображает всех пользователей из БД
    session = db_session.create_session()
    users = session.query(models.User).all()
    session.close()
    return render_template('all-users.html', users=users)
    """

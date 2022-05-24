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

"""def spamUsers(stop: int = 1000, _start: int = 0):
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

        session.add(user)"""
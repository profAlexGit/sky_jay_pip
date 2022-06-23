import TinyDatePicker from 'tiny-date-picker';

const dpInput = document.querySelector('.input-date-note');
if (dpInput) {
  const dp = TinyDatePicker(dpInput, {
    mode: 'dp-permanent',
    lang: {
      days: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      months: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
      ],
      today: 'Сегодня',
      clear: 'Очистить',
      close: 'Закрыть',
    },
    dayOffset: 1
  });

  dp.on({
    select: (_, dp) => console.log(dp.state.selectedDate)
  });
}
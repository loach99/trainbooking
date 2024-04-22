import { useEffect, useState, useRef } from 'react';
import './calendar.css';
import { getCurrentDate, monthInWeeks } from '../../utils/date';
import { validateCalendarDate } from '../../utils/validators';
import DaysInWeek from './DaysInWeek';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Weeks } from '../../types/types';
import { choiceDateFrom, choiceDateTo, sliceChoiceState } from '../../store/sliceChoice';

type Props = {
  classStyle: string,
};

export default function Calendar({ classStyle }: Props) {
  const { fromDate } = useAppSelector(sliceChoiceState);
  const date = getCurrentDate(fromDate);
  const [numMonth, setNumMonth] = useState(date.numberMonth);
  const [nameMonth, setNameMonth] = useState(date.month);
  const [days, setDays] = useState<Weeks | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  function refClassListToggle() {
    ref.current?.classList.remove(...ref.current.classList)
    ref.current?.classList.add('none');
  };

  function getDate(choiceDate: string) {
    if (classStyle.includes('from') && validateCalendarDate(choiceDate)) {
      dispatch(choiceDateFrom(choiceDate));
      refClassListToggle();
    };

    if (classStyle.includes('to') && validateCalendarDate(choiceDate)) {
      dispatch(choiceDateTo(choiceDate));
      refClassListToggle();
    };
  };

  useEffect(() => {
    function outsideClick(ev: MouseEvent): void {
      if (ev.target instanceof HTMLElement && !ref.current?.contains(ev.target)) {
        refClassListToggle();
      };
    };

    document.addEventListener("mousedown", outsideClick);
    return () => document.removeEventListener("mousedown", outsideClick);
  }, [ref]);

  useEffect(() => {
    const weeks = monthInWeeks(numMonth);
    setDays(weeks);
  }, [numMonth]);

  function onChoiceDate(day: number, month: number): void {
    const choiceDate = date.choiceDate(date.year, month, day);
    const compareChoiceDate = new Date(date.year, month, day).getTime();
    const compareToday = new Date(date.year, date.numberMonth, date.numDate).getTime();

    if (fromDate === '' && compareChoiceDate >= compareToday) {
      getDate(choiceDate);
    } else if (fromDate !== '' && compareToday <= compareChoiceDate) {
      getDate(choiceDate);
    };
  };

  function prevMonth() {
    setNumMonth((prev) => (prev - 1));
    setNameMonth(date.nameMonth(date.year, numMonth - 1));
  };

  function nextMonth() {
    setNumMonth((prev) => (prev + 1));
    setNameMonth(date.nameMonth(date.year, numMonth + 1));
  };

  return (
    <div className={classStyle} ref={ref}>
      <div className='cal-triangle'></div>
      <div className='cal-main'>
        <div className='cal-month'>
          <button className='prev-month' onClick={prevMonth} type='button'></button>
          <p className='cal-month-text'>{nameMonth}</p>
          <button className='next-month' onClick={nextMonth} type='button'></button>
        </div>
        <table className='cal-table'>
          <colgroup className='date-column'>
            <col />
            <col />
            <col />
            <col />
            <col />
            <col className="date-week-end" />
            <col className="date-week-end" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col" title="Понедельник">Пн</th>
              <th scope="col" title="Вторник">Вт</th>
              <th scope="col" title="Среда">Ср</th>
              <th scope="col" title="Четверг">Чт</th>
              <th scope="col" title="Пятница">Пт</th>
              <th scope="col" title="Суббота">Сб</th>
              <th scope="col" title="Воскресенье">Вс</th>
            </tr>
          </thead>
          {days !== null ? <tbody>
            {Object.entries(days).map((el) =>
              <DaysInWeek
                array={el[1]}
                date={date.numDate}
                currentMonth={date.numberMonth}
                otherMonth={numMonth}
                onChoiceDate={onChoiceDate}
                key={el[0]} />
            )}
          </tbody> : null}
        </table>
      </div>
    </div>
  )
}

import { Day } from '../../types/types';
import './calendar.css';

type Props = {
  array: Day[],
  date: number,
  currentMonth: number,
  otherMonth: number,
  onChoiceDate: (day: number, month: number) => void
};

export default function DaysInWeek({ array, date, currentMonth, otherMonth, onChoiceDate }: Props) {
  return (
    <tr>
      {array.map((el, i) => {
        if (el.curDay !== 'this') {
          return <td
            className="date-other-month"
            key={el.numDay + i}>
            {el.numDay}
          </td>
        } else if (el.curDay === 'this' && el.numDay < date && currentMonth === otherMonth) {
          return <td
            className="date-other-month"
            key={el.numDay + i}>
            {el.numDay}
          </td>
        } else if (el.curDay === 'this' && el.numDay === date && currentMonth === otherMonth) {
          return <td
            className="date-today"
            onClick={() => onChoiceDate(el.numDay, otherMonth)}
            key={el.numDay + i}>
            {el.numDay}
          </td>
        } else if (el.curDay === 'this') {
          return <td
            className="date-month"
            onClick={() => onChoiceDate(el.numDay, otherMonth)}
            key={el.numDay + i}>
            {el.numDay}
          </td>
        }
        return null;
      })}
    </tr>
  );
};

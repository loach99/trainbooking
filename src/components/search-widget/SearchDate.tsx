import './search-widget.css';
import InputDate from '../calendar/InputDate';

export default function SearchDate() {
  return (
    <div className='search-date'>
      <h4 className='search-date-text'>Дата</h4>
      <div className='search-date-inputs'>
        <InputDate inputStyle='date-input-from' calendarStyle='calendar-from' />
        <InputDate inputStyle='date-input-to' calendarStyle='calendar-to' />
      </div>
    </div>
  );
};
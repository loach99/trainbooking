import { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearChoiceDate, sliceChoiceState } from '../../store/sliceChoice';
import Calendar from './Calendar';
import './calendar.css';

type Props = {
  inputStyle: string,
  calendarStyle: string
};

export default function InputDate({ inputStyle = '', calendarStyle }: Props) {
  const [current, setCurrent] = useState<boolean>(false);
  const { fromDate, toDate } = useAppSelector(sliceChoiceState);
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (document.querySelector(`.${calendarStyle}`)) {
      ref.current = document.querySelector(`.${calendarStyle}`);
    };
  }, [current, calendarStyle]);

  useEffect(() => {
    handlerBlur();
  }, [fromDate, toDate]);

  function handlerInput() {
    if (fromDate !== '' && calendarStyle.includes('from')) {
      dispatch(clearChoiceDate());
    };

    if (toDate !== '' && calendarStyle.includes('from')) {
      dispatch(clearChoiceDate());
    };

    setCurrent(true);
  };

  function handlerBlur() {
    if (ref.current?.className === 'none') {
      setCurrent(false);
    };
  };

  return (
    <>
      <input className={inputStyle} type="text" placeholder="ДД.ММ.ГГ"
        value={calendarStyle.includes('from') ? fromDate : toDate}
        onChange={handlerInput}
        onClick={handlerInput}
        onBlur={handlerBlur} />
      {current ? <Calendar classStyle={calendarStyle} /> : null}
    </>
  );
};

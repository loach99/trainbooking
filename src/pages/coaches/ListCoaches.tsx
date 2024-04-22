import { useState } from 'react';
import './coaches.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import CoachesType from './components/CoachesType';
import { slicePriceState, totalChoiceRoute } from '../../store/slicePrice';
import { clearStepAll } from '../../store/sliceProgressLine';
import coachClassTypes from '../../utils/coachClassTypes';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ISeats } from '../../types/interfaces';
import { sliceChoiceState } from '../../store/sliceChoice';
import { sliceGetSeatsState } from '../../store/sliceGetSeats';

type StateButton = {
  disabled: boolean,
  className: string
}

export default function ListCoaches() {
  const { items } = useAppSelector(sliceGetSeatsState);
  const { route } = useAppSelector(sliceChoiceState);
  const navigate = useNavigate();
  const [types, setTypes] = useState<ISeats[][]>([]);
  const [button, setButton] = useState<StateButton>({
    disabled: true,
    className: '-disable'
  });
  const dispatch = useAppDispatch();
  const { totalSeatsAge, totalSeatsChild, totalAmountTickets } = useAppSelector(slicePriceState);

  useEffect(() => {
    dispatch(clearStepAll());
  }, [dispatch]);

  useEffect(() => {
    if (!!items.length) {
      setTypes(coachClassTypes(items));
    }
  }, [items]);

  useEffect(() => {
    if (totalAmountTickets === 0 && (totalSeatsAge !== 0 || totalSeatsChild !== 0)) {
      setButton({
        disabled: false,
        className: ''
      })
    } else {
      setButton({
        disabled: true,
        className: '-disable'
      });
    };
  }, [totalAmountTickets, totalSeatsAge, totalSeatsChild]);

  function toPassengers() {
    navigate('/route/passengers');
    dispatch(totalChoiceRoute());
  };

  return (
    <div className='coaches'>
      <h3 className='coaches-title'>выбор мест</h3>

      {types.map((el, i) => <CoachesType coaches={el} route={route} classStyle={i % 2 === 0 ? '-left' : '-right'} key={i} />)}

      <button className={`coach-button${button.className}`} type='button' disabled={button.disabled} onClick={toPassengers}>далее</button>
    </div>
  );
};

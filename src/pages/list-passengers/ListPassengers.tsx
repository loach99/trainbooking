import { useState } from 'react';
import './passenger.css';
import { useNavigate } from 'react-router-dom';
import Passenger from './components/Passenger';
import { useEffect } from 'react';
import { currentStepTwo } from '../../store/sliceProgressLine';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { StateAgePassenger } from '../../types/types';
import { sliceOrderState } from '../../store/sliceOrder';
import { slicePriceState } from '../../store/slicePrice';

export default function ListPassengers() {
  const { totalSeatsAge, totalSeatsChild } = useAppSelector(slicePriceState);
  const { departure: { seats } } = useAppSelector(sliceOrderState)
  const [amountPassengers, setAmountPassengers] = useState<number>(totalSeatsAge + totalSeatsChild);
  const [addComponents, setAddComponents] = useState<number[]>([]);
  const [agesPassengers, setAgesPassengers] = useState<StateAgePassenger>({
    age: totalSeatsAge,
    child: totalSeatsChild
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(currentStepTwo());
  }, [dispatch]);

  useEffect(() => {
    let age = 0;
    let child = 0;
    seats.map((el) => {
      if (el.person_info.is_adult) {
        age += 1;
      };

      if (!el.person_info.is_adult) {
        child += 1;
      };

      return el;
    });

    setAgesPassengers({
      age: totalSeatsAge - age,
      child: totalSeatsChild - child
    });
  }, [seats, totalSeatsAge, totalSeatsChild]);


  function addPassenger() {
    if (amountPassengers >= 1) {
      setAmountPassengers((prev) => prev -= 1);
      setAddComponents([...addComponents, 1]);
    };
  };

  function nextStepToOrder() {
    if (agesPassengers.age === 0 && agesPassengers.child === 0) {
      navigate('/route/payment');
    };
  };

  return (
    <div className='list-passengers'>
      {addComponents.map((e, i) => <Passenger
        addPassenger={addPassenger}
        agesPassengers={agesPassengers}
        num={e + i}
        key={e + i} />)}
      <div className='add-passengers' onClick={addPassenger}>
        <h4 className='add-passenger-title'>Добавить пассажира</h4>
        <span className='add-passenger-img'></span>
      </div>
      <button className={
        agesPassengers.age === 0 && agesPassengers.child === 0 ?
          'list-passenger-btn-ok' : 'list-passenger-btn'}
        type='button'
        onClick={nextStepToOrder}>Далее</button>
    </div>
  );
};

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IItem } from '../../types/interfaces';
import { TrainSeatsInfo } from '../../types/types';
import { useAppDispatch } from '../../store/hooks';
import { choiceRoute } from '../../store/sliceChoice';
import { getSeatsThunk } from '../../store/sliceGetSeats';
import { addRouteId, clearOrder } from '../../store/sliceOrder';
import './train-route.css';
import createArray from '../../utils/createTrainSeatsArray';
import { dateFromAndTo, duration } from '../../utils/trainDate';
import TrainRouteSeats from './TrainRouteSeats';

type Props = {
  route: IItem,
  btnText?: string
};

export default function TrainRoute({ route, btnText = 'Выбрать места' }: Props) {
  const [train, setTrain] = useState<TrainSeatsInfo[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const arrayInfo: TrainSeatsInfo[] = [];

    if (route) {
      if (route.departure.have_first_class) {
        createArray(route, arrayInfo, 'first', 'Люкс');
      };

      if (route.departure.have_second_class) {
        createArray(route, arrayInfo, 'second', 'Купе');
      };

      if (route.departure.have_third_class) {
        createArray(route, arrayInfo, 'third', 'Плацкарт');
      };

      if (route.departure.have_fourth_class) {
        createArray(route, arrayInfo, 'fourth', 'Сидячий');
      };

      setTrain(arrayInfo);
    };
  }, [route]);

  function getCoaches() {
    if (route) {
      dispatch(choiceRoute(route));
      dispatch(getSeatsThunk(route.departure._id));
      dispatch(addRouteId(route.departure._id));
      navigate('/route/coach');
    };
  };

  function backOrder() {
    dispatch(clearOrder());
    navigate('/route');
  };

  return (
    <div className='train-route'>
      <div className='train-name'>
        <span className='train-name-image'></span>
        <h5 className='train-name-text'>&#171;{route.departure.train.name}&#187;</h5>
        <div className='train-name-direction'>
          <p className='train-name-city'>{route.departure.from.city.name}&#8594;</p>
          <p className='train-name-city'>{route.departure.to.city.name}</p>
        </div>
      </div>

      <div className='train-direction'>
        <div className='train-direction-route'>
          <div className='train-direction-from'>
            <div className='direction-time'>{dateFromAndTo(route.departure.from.datetime)}</div>
            <div className='direction-from'>
              <h5 className='direction-city'>{route.departure.from.city.name}</h5>
              <p className='direction-station'>{route.departure.from.railway_station_name}</p>
              <p className='direction-station'>вокзал</p>
            </div>
          </div>
          <div className='train-direction-time'>
            <p className='travel-time'>{duration(route.departure.duration)}</p>
            <span className='direction-arrow'></span>
          </div>
          <div className='train-direction-to'>
            <div className='direction-time'>{dateFromAndTo(route?.departure.to.datetime)}</div>
            <div className='direction-to'>
              <h5 className='direction-city'>{route.departure.to.city.name}</h5>
              <p className='direction-station'>{route?.departure.to.railway_station_name}</p>
              <p className='direction-station'>вокзал</p>
            </div>
          </div>
        </div>
      </div>

      <div className='train-tickets'>
        <div className='train-tickets-options'>
          {train.map((el) =>
            <TrainRouteSeats
              name={el.name}
              seats={el.seats}
              price={el.price}
              seatPrice={el.seatPrice}
              key={el.name} />
          )}

        </div>

        <div className='train-facilities'>
          <span className={`${route.departure.have_wifi ? 'facilities-wifi-have' : 'train-facilities-wifi'}`}></span>
          <span className={`${route.departure.is_express ? 'facilities-express-have' : 'train-facilities-express'}`}></span>
          <span className={`${route.departure.have_air_conditioning ? 'facilities-coffee-have' : 'train-facilities-coffee'}`}></span>
        </div>

        {btnText !== 'Изменить' ?
          <button type='button' className='train-choice-btn' onClick={getCoaches}>{btnText}</button> :
          <button type='button' className='order-route-btn' onClick={backOrder}>{btnText}</button>}
      </div>
    </div>
  );
};

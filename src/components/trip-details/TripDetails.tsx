import { useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import './details.css';
import { dateFromAndTo, duration, toDate } from '../../utils/trainDate';
import { sliceChoiceState } from '../../store/sliceChoice';
import { slicePriceState } from '../../store/slicePrice';

export default function TripDetails() {
  const { route } = useAppSelector(sliceChoiceState);
  const { totalSeatsAge, totalSeatsChild, totalPriceAge, totalPriceChild, totalPriceAll } = useAppSelector(slicePriceState);
  const [hiddenThere, setHiddenThere] = useState('');
  const [hiddenPassengers, setHiddenPassengers] = useState('');

  function showThere() {
    if (hiddenThere !== 'none') {
      setHiddenThere('none');
    } else {
      setHiddenThere('');
    };
  };

  function showPassengers() {
    if (hiddenPassengers !== 'none') {
      setHiddenPassengers('none');
    } else {
      setHiddenPassengers('');
    };
  }

  return (
    <div className='details-main'>

      <div className='details-title'>
        <h3 className='details-title-text'>детали поездки</h3>
      </div>

      <div className='details-there'>
        <div className='details-there-head'>
          <span className='there-head-img'></span>
          <h4 className='there-head-title'>Туда</h4>
          <div className='there-head-date'>{toDate(route?.departure.from.datetime)}</div>
          <span className={hiddenThere === '' ? 'pass-head-open-down' : 'pass-head-open-up'} onClick={showThere}></span>
        </div>

        <div className={hiddenThere}>
          <div className='there-train-number'>
            <h5 className='there-train-title'>№ Поезда</h5>
            <p className='there-train-text'>{route?.departure.train._id.slice(0, 3)}</p>
          </div>

          <div className='there-train-name'>
            <h5 className='there-train-title'>Название</h5>
            <p className='there-train-text'>{route?.departure.train.name}</p>
          </div>

          <div className='there-route'>
            <div className='there-route-from'>
              <div className='there-time'>{dateFromAndTo(route?.departure.from.datetime)}</div>
              <div className='there-date'>{toDate(route?.departure.from.datetime)}</div>
              <div className='there-from'>
                <h5 className='there-city'>{route?.departure.from.city.name}</h5>
                <p className='there-station'>{route?.departure.from.railway_station_name}</p>
                <p className='there-station'>вокзал</p>
              </div>
            </div>
            <div className='there-arrow-time'>
              <p className='there-travel-time'>{duration(route?.departure.duration)}</p>
              <span className='there-direction-arrow'></span>
            </div>
            <div className='there-route-to'>
              <div className='there-time'>{dateFromAndTo(route?.departure.to.datetime)}</div>
              <div className='there-date'>{toDate(route?.departure.to.datetime)}</div>
              <div className='there-to'>
                <h5 className='there-city'>{route?.departure.to.city.name}</h5>
                <p className='there-station'>{route?.departure.to.railway_station_name}</p>
                <p className='there-station'>вокзал</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className='details-line'></div>

      <div className='details-back'></div>

      <div className='details-passengers'>
        <div className='details-passengers-head'>
          <span className='pass-head-img'></span>
          <h4 className='pass-head-title'>Пассажиры</h4>
          <span className={hiddenPassengers === '' ? 'pass-head-open-down' : 'pass-head-open-up'} onClick={showPassengers}></span>
        </div>

        <div className={hiddenPassengers}>
          <div className='pass-amount-price'>
            <div className='pass-amount'>
              <p className='amount'>{totalSeatsAge}</p>
              <p className='pass-ages'>Взрослых</p>
            </div>
            <div className='pass-price'>
              <p className='pass-price-text'>{totalPriceAge}</p>
              <span className='pass-price-sign'></span>
            </div>
          </div>
          <div className='pass-amount-price'>
            <div className='pass-amount'>
              <p className='amount'>{totalSeatsChild}</p>
              <p className='pass-ages'>Ребенок</p>
            </div>
            <div className='pass-price'>
              <p className='pass-price-text'>{totalPriceChild}</p>
              <span className='pass-price-sign'></span>
            </div>
          </div>
        </div>

      </div>

      <div className='details-line'></div>

      <div className='details-total'>
        <div className='details-total-line'>
          <p className='details-total-text'>итог</p>
          <p className='total-price-text'>{totalPriceAll}</p>
          <span className='details-total-sign'></span>
        </div>
      </div>
    </div>
  );
};

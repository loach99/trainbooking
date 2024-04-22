import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getLastRoutesThunk, sliceGetLastRoutesState } from '../../store/sliceGetLastRoutes';
import './last-routes.css';

export default function LastRoutes() {
  const { items } = useAppSelector(sliceGetLastRoutesState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getLastRoutesThunk());
  }, [dispatch]);

  return (
    <div className='last-routes'>
      <h4 className='last-title'>последние билеты</h4>
      <ul className='last-list'>
        {items.map((el) =>
          <li className='last-list-item' key={el.departure._id}>
            <div className='route-from-to'>
              <div className='route-from'>
                <h5 className='route-city-text'>{el.departure.from.city.name}</h5>
                <p className='route-station-text'>{el.departure.from.railway_station_name}</p>
                <p className='route-station-text'>вокзал</p>
              </div>
              <div className='route-to'>
                <h5 className='route-city-text'>{el.departure.to.city.name}</h5>
                <p className='route-station-text'>{el.departure.to.railway_station_name}</p>
                <p className='route-station-text'>вокзал</p>
              </div>
            </div>
            <div className='route-facilities-price'>
              <div className='route-facilities'></div>
              <div className='route-start-price'>
                <p className='price-start-text'>от</p>
                <p className='price-start-number'>{el.min_price}</p>
                <span className='sign-rub'></span>
              </div>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

import { useEffect, useRef, useState } from 'react';
import { TrainSeatsInfo } from '../../types/types';
import './train-route.css';

type SeatInfo = {
  name: string,
  price?: number,
};

export default function TrainRouteSeats({ name, seats, price, seatPrice }: TrainSeatsInfo) {
  const [hidden, setHidden] = useState<string>('none');
  const [seatInfo, setSeatInfo] = useState<SeatInfo[]>([]);
  const timer = useRef<NodeJS.Timeout>();

  function showSeats() {
    if (hidden === 'none') {
      setHidden('seat-up-down');
      timer.current = setTimeout(() => setHidden('none'), 3 * 1000);
    } else {
      setHidden('none');
    };
  };

  useEffect(() => clearTimeout(timer.current));

  useEffect(() => {
    const arrayPrice = [];
    if (Object.prototype.hasOwnProperty.call(seatPrice, 'top_price')) {
      arrayPrice.push({
        name: 'верхние',
        price: seatPrice?.top_price,
      });
    };

    if (Object.prototype.hasOwnProperty.call(seatPrice, 'bottom_price')) {
      arrayPrice.push({
        name: 'нижние',
        price: seatPrice?.bottom_price,
      });
    };

    if (Object.prototype.hasOwnProperty.call(seatPrice, 'side_price')) {
      arrayPrice.push({
        name: 'боковые',
        price: seatPrice?.side_price,
      });
    };

    setSeatInfo(arrayPrice);
  }, [seatPrice]);

  return (
    <div className='train-ticket'>
      <p className='ticket-class'>{name}</p>
      <span className='amount-seat' onMouseEnter={showSeats}>{seats}
        <div className={hidden}>
          {seatInfo.map((el, i) =>
            <div className='seat-up' key={i}>
              <p className='ticket-class'>{el.name}</p>
              <p className='seat-ticket-start-number'>{el.price}</p>
              <span className='sign-rub'></span>
            </div>
          )}
        </div>
      </span>
      <div className='ticket-start-price'>
        <p className='ticket-start-text'>от</p>
        <p className='ticket-start-number'>{price}</p>
        <span className='sign-rub'></span>
      </div>
    </div>
  );
};

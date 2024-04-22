import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TrainRoute from '../../components/train-route/TrainRoute';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearOrderPassengers, clearOrderPayment, sliceOrderState } from '../../store/sliceOrder';
import { postOrderThunk, slicePostOrderState } from '../../store/slicePostOrder';
import { currentStepFour } from '../../store/sliceProgressLine';
import './order.css';
import { sliceChoiceState } from '../../store/sliceChoice';
import { slicePriceState } from '../../store/slicePrice';

export default function Order() {
  const { route } = useAppSelector(sliceChoiceState);
  const { totalPriceAll } = useAppSelector(slicePriceState);
  const { user, departure } = useAppSelector(sliceOrderState);
  const { status } = useAppSelector(slicePostOrderState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(currentStepFour());
  }, [dispatch]);

  useEffect(() => {
    if (status) {
      navigate('/success');
    };
  }, [navigate, status]);

  function changePassengers() {
    navigate('/route/passengers');
    dispatch(clearOrderPassengers());
  };

  function changePayment() {
    navigate('/route/payment');
    dispatch(clearOrderPayment());
  };

  function confirmOrder() {
    dispatch(postOrderThunk({
      user,
      departure
    }));
  };

  return (
    <div className='order'>
      <div className='order-route'>
        <h4 className='order-route-title'>Поезд</h4>
        {route && <TrainRoute route={route} btnText={'Изменить'} />}
      </div>

      <div className='order-passengers'>
        <h4 className='order-passenger-title'>Пассажиры</h4>
        <div className='order-passenger-container'>
          <div className='passengers-container-list'>
            {departure.seats.map((el, i) =>
              <div className={`passengers-container-item${i === departure.seats.length - 1 ? '' : '-border'}`} key={i}>
                <div className='passenger-container-avatar'>
                  <span className='passenger-container-img'></span>
                  <p className='passenger-container-ages'>{el.person_info.is_adult ? 'Взрослый' : 'Ребенок'}</p>
                </div>
                <div className='passenger-container-data'>
                  <p className='passenger-container-name'>{`${el.person_info.last_name} ${el.person_info.first_name} ${el.person_info.patronymic}`}</p>
                  <p className='passenger-container-gender'>{`Пол ${el.person_info.gender ? 'мужской' : 'женский'}`}</p>
                  <p className='passenger-container-birth'>{`Дата рождения ${el.person_info.birthday}`}</p>
                  <p className='passenger-container-docs'>{`${el.person_info.document_type} ${el.person_info.document_data}`}</p>
                </div>
              </div>
            )}
          </div>
          <div className='passenger-container-change'>
            <div className='passenger-container-total'>
              <p>Всего</p>
              <div className='passenger-container-price'>
                <p>{totalPriceAll}</p>
                <span className='details-total-sign'></span>
              </div>
            </div>
            <button className='passenger-container-btn' onClick={changePassengers}>Изменить</button>
          </div>
        </div>
      </div>

      <div className='order-payment'>
        <h4 className='order-payment-title'>Способ оплаты</h4>
        <div className='order-payment-method'>
          <p className='order-payment-text'>{user.payment_method}</p>
          <button className='order-payment-btn' type='button' onClick={changePayment}>Изменить</button>
        </div>
      </div>

      <button className='order-btn' type='button' onClick={confirmOrder}>подтвердить</button>
    </div>
  );
};

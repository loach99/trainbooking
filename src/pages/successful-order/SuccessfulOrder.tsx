import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearAllCity } from '../../store/sliceChoice';
import { clearAllFiltering } from '../../store/sliceFilter';
import { clearRouteList } from '../../store/sliceGetRoute';
import { clearOrder, sliceOrderState } from '../../store/sliceOrder';
import { clearAllPrices, clearTotalPrice, slicePriceState } from '../../store/slicePrice';
import { clearStepAll } from '../../store/sliceProgressLine';
import './success.css';

type Stars = {
  one: string,
  two: string,
  three: string,
  four: string,
  five: string
};

export default function SuccessfulOrder() {
  const [star, setStar] = useState<Stars>({
    one: '',
    two: '',
    three: '',
    four: '',
    five: ''
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { totalPriceAll } = useAppSelector(slicePriceState);
  const { user } = useAppSelector(sliceOrderState);

  function checkOne() {
    setStar({
      one: '-check',
      two: '',
      three: '',
      four: '',
      five: ''
    });
  };

  function checkTwo() {
    setStar({
      one: '-check',
      two: '-check',
      three: '',
      four: '',
      five: ''
    });
  };

  function checkThree() {
    setStar({
      one: '-check',
      two: '-check',
      three: '-check',
      four: '',
      five: ''
    });
  };

  function checkFour() {
    setStar({
      one: '-check',
      two: '-check',
      three: '-check',
      four: '-check',
      five: ''
    });
  };

  function checkFive() {
    setStar({
      one: '-check',
      two: '-check',
      three: '-check',
      four: '-check',
      five: '-check'
    });
  };

  function backToMain() {
    navigate('/');
    dispatch(clearAllPrices());
    dispatch(clearTotalPrice());
    dispatch(clearAllFiltering());
    dispatch(clearRouteList());
    dispatch(clearAllCity());
    dispatch(clearStepAll());
    dispatch(clearOrder());
  };

  return (
    <div className='success-background'>
      <h2 className='success-title'>Благодарим Вас за заказ!</h2>

      <div className='success'>

        <div className='success-order'>
          <h4 className='suc-order-number'>№Заказа 285АА</h4>
          <div className='suc-price'>
            <p className='suc-price-text'>сумма</p>
            <div className='suc-price-number'>
              <p>{totalPriceAll}</p>
              <span className='suc-price-sign'></span>
            </div>
          </div>
        </div>

        <div className='success-description'>
          <div className='suc-desc-email'>
            <div className='desc-email-img'></div>
            <p className='suc-desc-text'>билеты будут отправлены на ваш e-mail</p>
          </div>

          <div className='suc-desc-print'>
            <div className='desc-print-img'></div>
            <p className='suc-desc-text'>распечатайте и сохраняйте билеты до даты поездки</p>
          </div>

          <div className='suc-desc-present'>
            <div className='desc-present-img'></div>
            <p className='suc-desc-text'>предьявите распечатанные билеты при посадке</p>
          </div>
        </div>

        <div className='success-name'>
          <p className='suc-name-order'>{`${user.first_name} ${user.patronymic}`}</p>
          <p className='suc-name-text'>Ваш заказ успешно оформлен.<br /> В ближайшее время с вами свяжется наш оператор для подтверждения.</p>
          <p className='suc-name-thx'>Благодарим Вас за оказанное доверие и желаем приятного путешествия!</p>
        </div>

        <div className='success-grade'>
          <div className='suc-grade'>
            <p className='suc-grade-text'>Оценить сервис</p>
            <div className='suc-grade-stars'>
              <span className={`star-one${star.one}`} onClick={checkOne}>
                <svg width="46" height="44" viewBox="0 0 46 44" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 3.23607L27.4373 16.8926L27.6618 17.5836H28.3883H42.7477L31.1307 26.0238L30.5429 26.4508L30.7675 27.1418L35.2047 40.7984L23.5878 32.3582L23 31.9311L22.4122 32.3582L10.7953 40.7984L15.2325 27.1418L15.4571 26.4508L14.8693 26.0238L3.25233 17.5836H17.6117H18.3382L18.5627 16.8926L23 3.23607Z" stroke="white" strokeWidth="2" />
                </svg>
              </span>
              <span className={`star-two${star.two}`} onClick={checkTwo}>
                <svg width="46" height="44" viewBox="0 0 46 44" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 3.23607L27.4373 16.8926L27.6618 17.5836H28.3883H42.7477L31.1307 26.0238L30.5429 26.4508L30.7675 27.1418L35.2047 40.7984L23.5878 32.3582L23 31.9311L22.4122 32.3582L10.7953 40.7984L15.2325 27.1418L15.4571 26.4508L14.8693 26.0238L3.25233 17.5836H17.6117H18.3382L18.5627 16.8926L23 3.23607Z" stroke="white" strokeWidth="2" />
                </svg>
              </span>
              <span className={`star-three${star.three}`} onClick={checkThree}>
                <svg width="46" height="44" viewBox="0 0 46 44" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 3.23607L27.4373 16.8926L27.6618 17.5836H28.3883H42.7477L31.1307 26.0238L30.5429 26.4508L30.7675 27.1418L35.2047 40.7984L23.5878 32.3582L23 31.9311L22.4122 32.3582L10.7953 40.7984L15.2325 27.1418L15.4571 26.4508L14.8693 26.0238L3.25233 17.5836H17.6117H18.3382L18.5627 16.8926L23 3.23607Z" stroke="white" strokeWidth="2" />
                </svg>
              </span>
              <span className={`star-four${star.four}`} onClick={checkFour}>
                <svg width="46" height="44" viewBox="0 0 46 44" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 3.23607L27.4373 16.8926L27.6618 17.5836H28.3883H42.7477L31.1307 26.0238L30.5429 26.4508L30.7675 27.1418L35.2047 40.7984L23.5878 32.3582L23 31.9311L22.4122 32.3582L10.7953 40.7984L15.2325 27.1418L15.4571 26.4508L14.8693 26.0238L3.25233 17.5836H17.6117H18.3382L18.5627 16.8926L23 3.23607Z" stroke="white" strokeWidth="2" />
                </svg>
              </span>
              <span className={`star-five${star.five}`} onClick={checkFive}>
                <svg width="46" height="44" viewBox="0 0 46 44" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 3.23607L27.4373 16.8926L27.6618 17.5836H28.3883H42.7477L31.1307 26.0238L30.5429 26.4508L30.7675 27.1418L35.2047 40.7984L23.5878 32.3582L23 31.9311L22.4122 32.3582L10.7953 40.7984L15.2325 27.1418L15.4571 26.4508L14.8693 26.0238L3.25233 17.5836H17.6117H18.3382L18.5627 16.8926L23 3.23607Z" stroke="white" strokeWidth="2" />
                </svg>
              </span>
            </div>
          </div>
          <button className='success-btn' type='button' onClick={backToMain}>вернуться на главную</button>
        </div>
      </div>
    </div>
  );
};

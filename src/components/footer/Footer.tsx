import { ChangeEvent, useEffect, useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Notice from '../notice/Notice';
import './footer.css';
import { validateEmail } from '../../utils/validators';
import { changeNotice } from '../../store/sliceNotice';
import { clearStatusSubscribe, postSubscribeThunk, slicePostSubscribeState } from '../../store/slicePostSubscribe';

export default function Footer() {
  const [input, setInput] = useState<string>('');
  const { status } = useAppSelector(slicePostSubscribeState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status) {
      dispatch(changeNotice({
        notice: true,
        text: 'Подписка успешно оформлена!'
      }));
      setInput('');
      setTimeout(() => dispatch(clearStatusSubscribe()), 5 * 1000);
    };
  }, [dispatch, status]);

  function inputSubscribe(ev: ChangeEvent<HTMLInputElement>) {
    setInput(ev.target.value);
  };

  function submit() {
    if (!validateEmail(input)) {
      dispatch(changeNotice({
        notice: true,
        text: 'Email указана некорректно.\n Пример: mail@mail.com'
      }));
    } else {
      dispatch(postSubscribeThunk(input));
    };
  };

  return (
    <footer id='footer' className='footer'>

      <Notice status={status} />

      <div className='footer-content'>
        <div className='footer-contacts'>
          <h4 className='contacts-title'>Свяжитесь с нами</h4>
          <ul className='contacts-list'>
            <li>
              <a className='contacts-item cont-phone' href="tel:88000000000">8 (800) 000 00 00</a>
            </li>
            <li>
              <a className='contacts-item cont-email' href="mailto:inbox@mail.ru">inbox@mail.ru</a>
            </li>
            <li>
              <a className='contacts-item cont-skype' target="_blank" href="tu.train.tickets">tu.train.tickets</a>
            </li>
            <li>
              <a className='contacts-item cont-address' target="_blank" href="google.maps.com">г. Москва ул. Московская 27-35 555 555</a>
            </li>
          </ul>
        </div>

        <div className='footer-subscribe'>
          <h4 className='subscribe-title'>Подписка</h4>
          <form className='subscribe-form'>
            <h5 className='sub-form-title'>Будьте в курсе событий</h5>
            <input className='sub-form-input' type="text" placeholder="e-mail"
              value={input}
              onChange={inputSubscribe} />
            <button className='sub-form-btn' type="button" onClick={submit}>отправить</button>
          </form>
          <div className='subscribe-links'>
            <h5 className='sub-links-title'>Подписывайтесь на нас</h5>
            <ul className='sub-links-list'>
              <li>
                <a className='sub-link link-youtube' target="_blank" href="youtube.com">
                  <span className='sub-logo-text'>youtube</span>
                </a>
              </li>
              <li>
                <a className='sub-link link-linkedin' target="_blank" href="linkedin.com">
                  <span className='sub-logo-text'>linkedin</span>
                </a>
              </li>
              <li>
                <a className='sub-link link-googleplus' target="_blank" href="plus.google.com">
                  <span className='sub-logo-text'>googleplus</span>
                </a>
              </li>
              <li>
                <a className='sub-link link-facebook' target="_blank" href="facebook.com">
                  <span className='sub-logo-text'>facebook</span>
                </a>
              </li>
              <li>
                <a className='sub-link link-twitter' target="_blank" href="twitter.com">
                  <span className='sub-logo-text'>twitter</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className='footer-line'>
        <div className='footer-logo'>
          <h3 className='footer-logo-text'>Лого</h3>
        </div>
        <HashLink to='#top' className='footer-up' />
        <div className='footer-date'>
          <p className='footer-date-text'>2022 web</p>
        </div>
      </div>
    </footer>
  );
};

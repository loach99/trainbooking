import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import ProgressLine from '../progress-line/ProgressLine';
import SearchWidget from '../search-widget/SearchWidget';
import { clearAllCity } from '../../store/sliceChoice';
import { clearAllFiltering } from '../../store/sliceFilter';
import { clearRouteList, sliceGetRouteState } from '../../store/sliceGetRoute';
import { sliceHeaderTransformState, transformHeader, transformHeaderSuccess, transformHeaderToMain } from '../../store/sliceHeaderTransform';
import { clearOrder } from '../../store/sliceOrder';
import { clearAllPrices, clearTotalPrice } from '../../store/slicePrice';
import { clearStepAll } from '../../store/sliceProgressLine';
import './header.css';

export default function Header() {
  const { classHeader, classSearch, classTitle, classLine, success } = useAppSelector(sliceHeaderTransformState);
  const { loading } = useAppSelector(sliceGetRouteState);
  let location = useLocation();
  const dispatch = useAppDispatch();


  useEffect(() => {
    window.scrollTo(0, 0);

    if (location.pathname === '/') {
      dispatch(transformHeaderToMain());
    } else if (location.pathname === '/success') {
      dispatch(transformHeaderSuccess());
    } else {
      dispatch(transformHeader());
    };
  }, [dispatch, location.pathname]);

  function clearStore() {
    dispatch(clearAllPrices());
    dispatch(clearTotalPrice());
    dispatch(clearAllFiltering());
    dispatch(clearRouteList());
    dispatch(clearAllCity());
    dispatch(clearStepAll());
    dispatch(clearOrder());
  };

  return (
    <>
      <header className={classHeader}>

        <div className='header-logo'>
          <HashLink to='/'>
            <h3 className='header-logo-text' onClick={clearStore}>Лого</h3>
          </HashLink>
        </div>

        <div className='header-nav'>
          <ul className='header-nav-list'>
            <li className='header-nav-item'>
              <HashLink to='/#main-about'>О нас</HashLink>
            </li>
            <li className='header-nav-item'>
              <HashLink to="/#main-how">Как это работает</HashLink>
            </li>
            <li className='header-nav-item'>
              <HashLink to="/#main-reviews">Отзывы</HashLink>
            </li>
            <li className='header-nav-item'>
              <HashLink to="/#footer">Контакты</HashLink>
            </li>
          </ul>
        </div>

        <div className={classTitle}>
          <h4 className='header-title-text'>
            Вся жизнь - <span>путешествие!</span>
          </h4>
        </div>

        {success ? null : <SearchWidget classStyle={classSearch} />}
      </header>
      {success ? null :
        <>
          <div className={classLine}></div>
          {classLine === 'none' && !loading ? <ProgressLine /> : null}
        </>}
    </>
  );
};

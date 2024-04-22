import { useEffect, useState, SyntheticEvent } from 'react';
import './list-routes.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearStepAll, currentStepOne } from '../../store/sliceProgressLine';
import TrainRoute from '../../components/train-route/TrainRoute';
import { addRoutes, filtering, sliceFilterState } from '../../store/sliceFilter';
import { filteringPricesRange } from '../../utils/minMaxPrices';
import { sortingDuration, sortingPrices, sortingTime } from '../../utils/sortingTrain';
import { dateForComparison, timeForSort } from '../../utils/trainDate';
import { IItem } from '../../types/interfaces';
import { sliceChoiceState } from '../../store/sliceChoice';
import { sliceGetRouteState } from '../../store/sliceGetRoute';

export default function ListRoutes() {
  const { loading, items } = useAppSelector(sliceGetRouteState);
  const { fromDate } = useAppSelector(sliceChoiceState);
  const {
    filteredRoutes,
    filterSeats,
    filterPrices,
    filterTimeFrom,
    filterTimeTo
  } = useAppSelector(sliceFilterState);
  const dispatch = useAppDispatch();
  const [list, setList] = useState<IItem[]>([]);
  const [none, setNone] = useState('none');
  const [select, setSelect] = useState('времени');
  const [pages, setPages] = useState<number[]>([]);
  const [showOnPages, setShowOnPages] = useState(5);
  const [startSlice, setStartSlice] = useState(0);
  const [endSlice, setEndSlice] = useState(5);
  const [lengthPage, setLengthPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(clearStepAll());
  }, [dispatch]);

  useEffect(() => {
    dispatch(filtering({
      start: filterPrices.start,
      end: filterPrices.end,
      date: fromDate,
      filteringPricesRange,
      timeForSort,
      dateForComparison
    }));
  }, [filterSeats, filterPrices, filterTimeFrom, filterTimeTo, fromDate, dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => setList(filteredRoutes), 500);
    return () => clearTimeout(timer);
  }, [filteredRoutes]);

  useEffect(() => {
    if (items && items.items.length > 0) {
      dispatch(addRoutes(items.items));
      setList(items.items);
    };
  }, [loading, items, dispatch]);

  useEffect(() => {
    if (!loading) {
      dispatch(currentStepOne());
    };

    if (list) {
      setPages([]);
      const arr = []
      for (let i = 0; i < (list.length / showOnPages); i += 1) {
        arr.push(i);
      };
      setPages(arr);
    };
  }, [dispatch, list, loading, showOnPages]);

  useEffect(() => {
    if (list.length > 0) {
      swapClassStyle(currentPage);
    };
  }, [currentPage, list.length]);

  function getSort() {
    if (none === 'none') {
      setNone('list-routes-sort-select');
    } else {
      setNone('none');
    }
  };

  function getSelect(ev: SyntheticEvent<HTMLElement>) {
    if (ev.currentTarget.textContent) {
      setSelect(ev.currentTarget.textContent);
      setNone('none');
      if (ev.currentTarget.textContent === 'времени') {
        setList(sortingTime(list));
      };
      if (ev.currentTarget.textContent === 'стоимости') {
        setList(sortingPrices(list));
      };
      if (ev.currentTarget.textContent === 'длительности') {
        setList(sortingDuration(list));
      };
    };
  };

  function getShowOnPages(ev: SyntheticEvent<HTMLElement>) {
    setShowOnPages(Number(ev.currentTarget.textContent));
    setStartSlice(0);
    setLengthPage(Number(ev.currentTarget.textContent));
    setEndSlice(Number(ev.currentTarget.textContent));
  };

  function choicePage(ev: SyntheticEvent<HTMLElement>) {
    setCurrentPage(Number(ev.currentTarget.textContent));
    setStartSlice(lengthPage * (Number(ev.currentTarget.textContent) - 1));
    setEndSlice(lengthPage * Number(ev.currentTarget.textContent));
  };

  function prevPage() {
    if (startSlice >= lengthPage) {
      setStartSlice(startSlice - lengthPage);
    };

    if (endSlice >= lengthPage * 2) {
      setEndSlice(endSlice - lengthPage);
    };

    if ((currentPage - 1) > 0 && pages.length > 1) {
      setCurrentPage((prev) => prev -= 1);
    };

  };

  function nextPage() {
    if (startSlice < (lengthPage * (pages.length - 1))) {
      setStartSlice(startSlice + lengthPage);
    };

    if (endSlice < lengthPage * pages.length) {
      setEndSlice(endSlice + lengthPage);
    };

    if (currentPage < pages.length) {
      setCurrentPage((prev) => prev += 1);
    };

  };

  function swapClassStyle(page: number) {
    const elements = document.querySelectorAll('.list-routes-page');

    if (elements.length > 0) {
      for (const i of elements) {
        if (i.classList.contains('choice-page')) {
          i.classList.remove('choice-page');
        };
      };
      elements[page - 1].classList.add('choice-page');
    }

  };

  if (!Boolean(list.length)) {
    return <div className='no-routes'>Ничего не найдено!</div>
  };

  return (
    <div className='list-routes'>
      <header className='header-list-routes'>
        <div className='list-routes-found'>
          <p>найдено </p>
          <span>{list ? list.length : ''}</span>
        </div>
        <div className='list-routes-sort'>
          <p>сортировать по:
            <span className='sort-selected' onClick={getSort}>{select}</span>
          </p>
          <div className={none}>
            <div className='select-time' onClick={getSelect}>времени</div>
            <div className='select-price' onClick={getSelect}>стоимости</div>
            <div className='select-duration' onClick={getSelect}>длительности</div>
          </div>
        </div>
        <div className='list-routes-show'>
          <p>показывать по </p>
          <span onClick={getShowOnPages}>5</span>
          <span onClick={getShowOnPages}>10</span>
          <span onClick={getShowOnPages}>20</span>
        </div>
      </header>

      <main className='main-list-routes'>
        {list.slice(startSlice, endSlice).map((el) => <TrainRoute route={el} key={el.departure._id} />)}
      </main>

      <footer className='footer-list-routes'>
        <div className='list-routes-pages'>
          <div className='list-routes-pages-previous' onClick={prevPage}></div>
          {pages.map((el, i) =>
            <div className='list-routes-page' onClick={choicePage} key={10 + i}>{i + 1}</div>
          )}
          <div className='list-routes-pages-next' onClick={nextPage}></div>
        </div>
      </footer>
    </div>
  );
};

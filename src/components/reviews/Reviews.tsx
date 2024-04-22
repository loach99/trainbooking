import { BaseSyntheticEvent, useEffect, useRef, useState } from 'react';
import { reviews } from '../../utils/reviews';
import './reviews.css';

export default function Reviews() {
  const length = -727;
  const dotsArray = [...reviews];
  dotsArray.splice(0, 2);
  const element = useRef<HTMLDivElement>(null);
  const [num, setNum] = useState<number>(0);
  const [translate, setTranslate] = useState<number>(0);
  const [view, setView] = useState<number>(window.scrollY);

  function counter(arg: number): void {
    if (element.current) {
      for (let item of element.current.children) {
        item.classList.remove('active-dot');
      };

      if (num === dotsArray.length) {
        element.current.children[0].classList.add('active-dot');
        setTranslate(0);
        setNum(0);
      } else {
        element.current.children[arg + 1].classList.toggle('active-dot');
        setTranslate(length * (arg + 1));
        setNum(arg + 1);
      };
    };
  };

  useEffect(() => {
    const interval = setInterval(() => setView(window.scrollY), 1000);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    const carouselInterval = setTimeout(() => {
      if (view >= 2100 && view <= 2400) {
        counter(num);
      };
    }, 2 * 1000);
    return () => clearTimeout(carouselInterval);
  });

  function changeReview(ev: BaseSyntheticEvent): void {
    if (element.current) {
      const div = ev.target;
      let count = 0;
      for (let item of element.current.children) {
        item.classList.remove('active-dot');
        if (div.classList.contains(`dot-${count}`)) {
          setTranslate(length * (count + 1));
        };
        count += 1;
      };

      div.classList.toggle('active-dot');

      if (div.classList.contains('dot')) {
        setTranslate(0);
      };
    };
  };

  return (
    <div id='main-reviews' className='main-reviews'>
      <div className='reviews-title'>отзывы</div>
      <div className='reviews'>
        <div className='reviews-carousel' style={{ transform: `translateX(${translate}px)` }}>

          {reviews.map((el, i) => (
            <div className='review' key={el.name + i}>
              <img className='review-image' src={el.image} alt={el.name} />
              <div className='review-content'>
                <h5 className='review-name'>{el.name}</h5>
                <p className='review-text'>
                  {el.content}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
      <div className='carousel-dots' ref={element}>
        <div className='carousel-dot dot active-dot' onClick={changeReview}></div>
        {dotsArray.map((e, i) =>
          <div className={`carousel-dot dot-${i}`} onClick={changeReview} key={`dot-${i}`}></div>
        )}
      </div>
    </div>
  );
};

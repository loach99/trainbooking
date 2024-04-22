import '../main.css';

export default function About() {
  return (
    <div id='main-about' className='main-about'>
      <h4 className='about-title'>о нас</h4>
      <div className='about-content'>
        <div className='about-line'></div>
        <div>
          <p className='about-text-first'>
            Мы рады видеть вас! Мы работаем для Вас с 2003 года. 14 лет мы наблюдаем, как с каждым днем
            все больше людей заказывают жд билеты через интернет.
          </p>
          <p className='about-text-second'>
            Сегодня можно заказать железнодорожные билеты онлайн всего в 2 клика, но стоит ли это делать?
            Мы расскажем о преимуществах заказа через интернет.
          </p>
          <p className='about-text-third'>
            Покупать жд билеты дешево можно за 90 суток до отправления поезда.
            Благодаря динамическому ценообразованию цена на билеты в это время самая низкая.
          </p>
        </div>
      </div>
    </div>
  );
};

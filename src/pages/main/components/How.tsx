import '../main.css';

export default function How() {
  return (
    <div id='main-how' className='main-how'>
      <div className='how-title'>
        <h4 className='how-title-text'>как это работает</h4>
        <button className='how-title-btn' type='button'>Узнать больше</button>
      </div>
      <div className='how-content'>
        <div className='how-content-item'>
          <div className='how-image-first'></div>
          <p className='how-content-text'>Удобный заказ на сайте</p>
        </div>
        <div className='how-content-item'>
          <div className='how-image-second'></div>
          <p className='how-content-text'>Нет необходимости ехать в офис</p>
        </div>
        <div className='how-content-item'>
          <div className='how-image-third'></div>
          <p className='how-content-text'>Огромный выбор направлений</p>
        </div>
      </div>
    </div>
  );
};

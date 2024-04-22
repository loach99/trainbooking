import './main.css';
import About from './components/About';
import How from './components/How';
import Reviews from '../../components/reviews/Reviews';

export default function Main() {
  return (
    <main className='main'>
      <About />
      <How />
      <Reviews />
    </main>
  );
};

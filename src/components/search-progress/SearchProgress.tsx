import { MutableRefObject, useEffect, useRef, useState } from 'react';
import './search-progress.css';

export default function SearchProgress() {
  const [line, setLine] = useState<number>(0);
  const ref: MutableRefObject<NodeJS.Timeout | null> = useRef(null);

  useEffect(() => {
    ref.current = setTimeout(() => {
      if (line <= 99) {
        setLine((prev) => prev + 1);
      }
    }, 20);

    if (ref.current) {
      return clearTimeout(ref.current);
    }
  }, [line]);

  return (
    <div className='search-progress'>
      <div className='search-progress-line' style={{ width: `${line}%` }}></div>
      <img className='search-progress-img' src={require('../../media/images/loading.gif')} alt="" />
    </div>
  );
};

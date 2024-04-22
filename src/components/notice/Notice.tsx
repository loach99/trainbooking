import React, { MutableRefObject, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { changeNotice, sliceNoticeState } from '../../store/sliceNotice';
import './notice.css';

type Props = {
  status: boolean
};

export default function Notice({ status }: Props) {
  const dispatch = useAppDispatch();
  const { notice, text } = useAppSelector(sliceNoticeState);
  const ref: MutableRefObject<NodeJS.Timeout | null> = useRef(null);

  useEffect(() => {
    if (notice) {
      ref.current = setTimeout(() => dispatch(changeNotice({
        notice: false,
        text: ''
      })), 5 * 1000);
    };
    if (ref.current) {
      return clearTimeout(ref.current)
    };
  }, [dispatch, notice]);

  return (
    <div className={notice ? 'modal-tickets' : 'none'}>
      <div className={status ? 'modal-img-ok' : 'modal-img'}></div>
      <p className='modal-text'>{text}</p>
      <button className='modal-btn' onClick={() => dispatch(changeNotice({
        notice: false,
        text: ''
      }))} type='button'>Понятно</button>
    </div>
  );
};

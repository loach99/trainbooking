import { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import './progress-line.css';
import { sliceProgressLineState } from '../../store/sliceProgressLine';

type Step = {
  one: string,
  two: string,
  three: string,
  four: string
};

export default function ProgressLine() {
  const { stepOne, stepTwo, stepThree, stepFour } = useAppSelector(sliceProgressLineState);
  const [step, setStep] = useState<Step>({
    one: '',
    two: '',
    three: '',
    four: ''
  });
  useEffect(() => {
    if (stepOne) {
      setStep({
        one: 'current-step',
        two: '',
        three: '',
        four: ''
      })
    } else if (stepTwo) {
      setStep({
        one: 'current-step',
        two: 'current-step',
        three: '',
        four: ''
      });
    } else if (stepThree) {
      setStep({
        one: 'current-step',
        two: 'current-step',
        three: 'current-step',
        four: ''
      });
    } else if (stepFour) {
      setStep({
        one: 'current-step',
        two: 'current-step',
        three: 'current-step',
        four: 'current-step'
      });
    };

  }, [stepFour, stepOne, stepThree, stepTwo])



  return (
    <div className='progress-line'>
      <div className={'steps-start ' + step.one}></div>

      <div className={'line-step-one ' + step.one}>
        <div className={'step-number ' + step.one}>
          <p>1</p>
        </div>
        <div className={'step-text ' + step.one}>Билеты</div>
        <div className='step-arrow'>
          <div className={'arrow-top ' + step.one}></div>
          <div className={'arrow-bottom ' + step.one}></div>
        </div>
      </div>

      <div className={'line-step-two ' + step.two}>
        <div className={'step-arrow-out ' + step.two}></div>
        <div className={'step-number ' + step.two}>
          <p>2</p>
        </div>
        <div className={'step-text ' + step.two}>Пассажиры</div>
        <div className='step-arrow'>
          <div className={'arrow-top ' + step.two}></div>
          <div className={'arrow-bottom ' + step.two}></div>
        </div>
      </div>

      <div className={'line-step-three ' + step.three}>
        <div className={'step-arrow-out ' + step.three}></div>
        <div className={'step-number ' + step.three}>
          <p>3</p>
        </div>
        <div className={'step-text ' + step.three}>Оплата</div>
        <div className='step-arrow'>
          <div className={'arrow-top ' + step.three}></div>
          <div className={'arrow-bottom ' + step.three}></div>
        </div>
      </div>

      <div className={'line-step-four ' + step.four}>
        <div className={'step-arrow-out ' + step.four}></div>
        <div className={'step-number ' + step.four}>
          <p>4</p>
        </div>
        <div className={'step-text ' + step.four}>Проверка</div>
      </div>

      <div className={'steps-end ' + step.four}></div>
    </div>
  );
};

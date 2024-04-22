import './error.css';

type Props = {
  classStyle: string
};

export default function Error({ classStyle }: Props) {
  return (
    <div className={classStyle}>
      <p>Введите пункт отправления!</p>
    </div>
  );
};

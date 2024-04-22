import { ISeats } from "../types/interfaces";

export default function coachClassTypes(array: ISeats[]): ISeats[][] {
  const classes = [];
  const first = [];
  const second = [];
  const third = [];
  const fourth = [];

  for (let i = 0; i < array.length; i += 1) {
    if (array[i].coach.class_type === 'first') {
      first.push(array[i]);
    };
    if (array[i].coach.class_type === 'second') {
      second.push(array[i]);
    };
    if (array[i].coach.class_type === 'third') {
      third.push(array[i]);
    };
    if (array[i].coach.class_type === 'fourth') {
      fourth.push(array[i]);
    };
  };

  if (first.length > 0) {
    classes.push(first);
  };
  if (second.length > 0) {
    classes.push(second);
  };
  if (third.length > 0) {
    classes.push(third);
  };
  if (fourth.length > 0) {
    classes.push(fourth);
  };

  return classes;
}
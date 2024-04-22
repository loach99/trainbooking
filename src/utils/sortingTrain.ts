import { IItem } from '../types/interfaces';

export function sortingPrices(array: IItem[]): IItem[] {
  return [...array].sort((a, b) => a.min_price - b.min_price);
};

export function sortingTime(array: IItem[]): IItem[] {
  return [...array].sort((a, b) => a.departure.from.datetime - b.departure.from.datetime);
};

export function sortingDuration(array: IItem[]): IItem[] {
  return [...array].sort((a, b) => a.departure.duration - b.departure.duration);
};
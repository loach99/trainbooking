import { IAvailableSeatsInfo, IItem, IPriceClass, IPriceInfo } from "../types/interfaces";
import { TrainSeatsInfo } from "../types/types";

export default function createArray(
  route: IItem,
  array: TrainSeatsInfo[],
  seatClass: string,
  nameClass: string
): TrainSeatsInfo[] {
  const prices: number[] = [];
  const priceClass: IPriceClass | undefined = route.departure.price_info[seatClass as keyof IPriceInfo];
  if (priceClass) {
    for (const [, value] of Object.entries(priceClass)) {
      prices.push(Number(value));
    };
    prices.sort((a, b) => a - b);

    array.push({
      name: nameClass,
      seats: route.available_seats_info[seatClass as keyof IAvailableSeatsInfo],
      price: prices[0],
      seatPrice: route.departure.price_info[seatClass as keyof IPriceInfo]
    });
  };

  return array;
};
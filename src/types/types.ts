import { IItem, IOrderDeparture, IPriceClass, IUser } from './interfaces';

export type Filter = {
  start: number,
  end: number,
  date: string,
  filteringPricesRange: (min: number, max: number, array: IItem[]) => IItem[],
  timeForSort: (arg: number) => number,
  dateForComparison: (arg: string) => number
}

export type StartEnd = {
  start: number,
  end: number
};

export type FilterSeats = {
  coupe: boolean,
  reserved: boolean,
  seated: boolean,
  lux: boolean,
  wifi: boolean,
  express: boolean
};

export type MinMaxPrices = {
  minPrice: number,
  maxPrice: number,
  allPrices: number[]
};

export type NumberIdCoach = {
  number: number,
  idCoach: string
};

export type AmountSeats = {
  top: number,
  bottom: number,
  side: number,
  sum: number,
  other: number
};

export type CurrentDate = {
  numDate: number,
  year: number,
  month: string,
  numberMonth: number,
  choiceDate: (year: number, month: number, day: number) => string,
  nameMonth: (year: number, month: number) => string
};

export type Day = {
  numDay: number,
  curDay: string
};

export type Weeks = {
  first: Day[],
  second: Day[],
  third: Day[],
  fourth: Day[],
  fifth: Day[],
  sixth: Day[]
};

export type Order = {
  user: IUser,
  departure: IOrderDeparture
};

export type SearchInputs = {
  city?: string,
  from: string,
  to: string
};

export type TrainSeatsInfo = {
  name: string,
  seats?: number,
  price: number,
  seatPrice?: IPriceClass
};

export type FilterState = {
  start: number,
  end: number
};

export type FilterCheck = {
  coupe: boolean,
  reserved: boolean,
  seated: boolean,
  lux: boolean,
  wifi: boolean,
  express: boolean
};

export type FilterNone = {
  there: boolean,
  back: boolean
};

export type FuncValue = (max: number, min: number, end: number) => number;

export type StateAgePassenger = {
  age: number,
  child: number
};

export type SeatsClass = {
  seatsAge: number,
  seatsChild: number,
  seatsNumber?: NumberIdCoach[],
  amountTickets?: number,
  seatsPriceAge?: number,
  seatsPriceChild?: number,
  totalPrice: number
};
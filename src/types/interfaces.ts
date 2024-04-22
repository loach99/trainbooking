import { NumberIdCoach } from "./types";

export interface IRoute {
  total_count: number;
  items: IItem[];
}

export interface ITrainRoute {
  have_first_class: boolean;
  have_second_class: boolean;
  have_third_class: boolean;
  have_fourth_class: boolean;
  have_wifi: boolean;
  have_air_conditioning: boolean;
  is_express: boolean;
  min_price: number;
  available_seats: number;
  available_seats_info: IAvailableSeatsInfo;
}

export interface IItem extends ITrainRoute {
  departure: IDeparture;
}

export interface IDeparture extends ITrainRoute {
  _id: string;
  duration: number;
  train: IIdName;
  from: IFrom;
  to: IFrom;
  price_info: IPriceInfo;
}

export interface IAvailableSeatsInfo {
  first?: number;
  second?: number;
  third?: number;
  fourth?: number;
}

export interface IFrom {
  railway_station_name: string;
  city: IIdName;
  datetime: number;
}

export interface IIdName {
  _id: string;
  name: string;
}

export interface IPriceInfo {
  first?: IPriceClass;
  second?: IPriceClass;
  third?: IPriceClass;
  fourth?: IPriceClass;
}

export interface IPriceClass {
  top_price: number;
  bottom_price: number;
  side_price?: number;
}

export interface IOrder {
  user: IUser;
  departure: IOrderDeparture;
}

export interface IOrderDeparture {
  route_direction_id: string;
  seats: ISeat[];
}

export interface ISeat {
  coach_id: string;
  person_info: IPersonInfo;
  seat_number: number;
  is_child: boolean;
  include_children_seat: boolean;
}

export interface IPersonInfo {
  is_adult: boolean;
  first_name: string;
  last_name: string;
  patronymic: string;
  gender: boolean;
  birthday: Date | string;
  document_type: string;
  document_data: string;
}

export interface IUser {
  first_name: string;
  last_name: string;
  patronymic: string;
  phone: string;
  email: string;
  payment_method: string;
}

export interface ISeats {
  coach: ICoach;
  seats: ISeatAvailable[];
}

export interface ICoach extends ITrainRoute {
  _id: string;
  name: string;
  class_type: string;
  price: number;
  top_price: number;
  bottom_price: number;
  side_price: number;
  linens_price: number;
  wifi_price: number;
  is_linens_included: boolean;
  train: string;
  seats: string;
}

export interface ISeatAvailable {
  index: number;
  available: boolean;
}

export interface IGetStatus<T> {
  items: T;
  loading: boolean;
  error: boolean | string;
}

export interface IPostStatus {
  status: boolean,
  loading: boolean,
  error: boolean | string
}

interface IClassType {
  classType: string,
}

export interface SICoachSeat extends IClassType {
  seat: NumberIdCoach
}

export interface SIPriceSeat extends IClassType {
  price: number
}

export interface SIAmountTicket extends IClassType {
  amount: number
}

export interface SIAgeTickets extends IClassType {
  seatsAge: number
}

export interface SIChildTickets extends IClassType {
  seatsChild: number
}

export interface ISearchRoute {
  fromDate: string;
  toDate: string;
  fromCity: IIdName;
  toCity: IIdName;
}

export interface ISeatClass {
  seatsAge: number;
  seatsChild: number;
  totalPrice: number;
  amountTickets: number;
};

export interface ISeatsClass extends ISeatClass {
  seatsNumber: NumberIdCoach[];
  seatsPriceAge: number;
  seatsPriceChild: number;
};
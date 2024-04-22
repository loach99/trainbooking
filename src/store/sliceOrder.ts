import { IUser, ISeat } from '../types/interfaces';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from '../types/types';
import { RootState } from '.';

const initialState: Order = {
  user: {
    first_name: '',
    last_name: '',
    patronymic: '',
    phone: '',
    email: '',
    payment_method: ''
  },
  departure: {
    route_direction_id: '',
    seats: []
  }
};

export const sliceOrder = createSlice({
  name: 'sliceOrder',
  initialState,
  reducers: {
    addUserPayment: (state, actions: PayloadAction<IUser>) => {
      state.user = actions.payload;
    },
    addSeatPassenger: (state, actions: PayloadAction<ISeat>) => {
      state.departure.seats = [...state.departure.seats, actions.payload];
    },
    addRouteId: (state, actions: PayloadAction<string>) => {
      state.departure.route_direction_id = actions.payload;
    },
    removeSeatPassenger: (state, actions: PayloadAction<string>) => {
      state.departure.seats = state.departure.seats.filter((el) => el.coach_id !== actions.payload);
    },
    clearOrder: (state) => {
      state.user = {
        first_name: '',
        last_name: '',
        patronymic: '',
        phone: '',
        email: '',
        payment_method: ''
      };
      state.departure = {
        route_direction_id: '',
        seats: []
      };
    },
    clearOrderPassengers: (state) => {
      state.user = {
        first_name: '',
        last_name: '',
        patronymic: '',
        phone: '',
        email: '',
        payment_method: ''
      };
      state.departure.seats = [];
    },
    clearOrderPayment: (state) => {
      state.user = {
        first_name: '',
        last_name: '',
        patronymic: '',
        phone: '',
        email: '',
        payment_method: ''
      };
    }
  }
});

export const {
  addUserPayment,
  addSeatPassenger,
  addRouteId,
  removeSeatPassenger,
  clearOrder,
  clearOrderPassengers,
  clearOrderPayment
} = sliceOrder.actions;

export const sliceOrderState = (state: RootState) => state.sliceOrder

export default sliceOrder.reducer;
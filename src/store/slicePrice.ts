import { SIAgeTickets, SICoachSeat, SIChildTickets, SIPriceSeat, SIAmountTicket, ISeatsClass } from '../types/interfaces';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NumberIdCoach } from "../types/types";
import { RootState } from '.';

type State = {
  firstClass: ISeatsClass,
  secondClass: ISeatsClass,
  thirdClass: ISeatsClass,
  fourthClass: ISeatsClass,
  seatsChildWithout: number,
  totalSeatsAge: number,
  totalSeatsChild: number,
  totalSeatsNumber: NumberIdCoach[],
  totalAmountTickets: number,
  totalPriceAge: number,
  totalPriceChild: number,
  totalPriceAll: number
};

const initialState: State = {
  firstClass: {
    seatsAge: 0,
    seatsChild: 0,
    seatsNumber: [],
    amountTickets: 0, // seatsAge + seatsChild
    seatsPriceAge: 0,
    seatsPriceChild: 0,
    totalPrice: 0 // seatsPrice + serviceWifi + serviceLinens
  },
  secondClass: {
    seatsAge: 0,
    seatsChild: 0,
    seatsNumber: [],
    amountTickets: 0, // seatsAge + seatsChild
    seatsPriceAge: 0,
    seatsPriceChild: 0,
    totalPrice: 0 // seatsPrice + serviceWifi + serviceLinens
  },
  thirdClass: {
    seatsAge: 0,
    seatsChild: 0,
    seatsNumber: [],
    amountTickets: 0, // seatsAge + seatsChild
    seatsPriceAge: 0,
    seatsPriceChild: 0,
    totalPrice: 0 // seatsPrice + serviceWifi + serviceLinens
  },
  fourthClass: {
    seatsAge: 0,
    seatsChild: 0,
    seatsNumber: [],
    amountTickets: 0, // seatsAge + seatsChild
    seatsPriceAge: 0,
    seatsPriceChild: 0,
    totalPrice: 0 // seatsPrice + serviceWifi + serviceLinens
  },
  seatsChildWithout: 0,
  totalSeatsAge: 0,
  totalSeatsChild: 0,
  totalSeatsNumber: [],
  totalAmountTickets: 0,
  totalPriceAge: 0,
  totalPriceChild: 0,
  totalPriceAll: 0
};

export const slicePrice = createSlice({
  name: 'slicePrice',
  initialState,
  reducers: {
    changeAgeTickets: (state, actions: PayloadAction<SIAgeTickets>) => {
      if (actions.payload.classType === 'first') {
        state.firstClass.seatsAge = actions.payload.seatsAge;
        state.firstClass.amountTickets = state.firstClass.seatsChild + actions.payload.seatsAge;
      };
      if (actions.payload.classType === 'second') {
        state.secondClass.seatsAge = actions.payload.seatsAge;
        state.secondClass.amountTickets = state.secondClass.seatsChild + actions.payload.seatsAge;
      };
      if (actions.payload.classType === 'third') {
        state.thirdClass.seatsAge = actions.payload.seatsAge;
        state.thirdClass.amountTickets = state.thirdClass.seatsChild + actions.payload.seatsAge;
      };
      if (actions.payload.classType === 'fourth') {
        state.fourthClass.seatsAge = actions.payload.seatsAge;
        state.fourthClass.amountTickets = state.fourthClass.seatsChild + actions.payload.seatsAge;
      };
      const amountTickets = state.firstClass.seatsAge + state.secondClass.seatsAge + state.thirdClass.seatsAge + state.fourthClass.seatsAge;
      state.totalSeatsAge = amountTickets;
      state.totalAmountTickets = state.totalSeatsAge + state.totalSeatsChild;
    },
    changeChildTickets: (state, actions: PayloadAction<SIChildTickets>) => {
      if (actions.payload.classType === 'first') {
        state.firstClass.seatsChild = actions.payload.seatsChild;
        state.firstClass.amountTickets = state.firstClass.seatsAge + actions.payload.seatsChild;
      };
      if (actions.payload.classType === 'second') {
        state.secondClass.seatsChild = actions.payload.seatsChild;
        state.secondClass.amountTickets = state.secondClass.seatsAge + actions.payload.seatsChild;
      };
      if (actions.payload.classType === 'third') {
        state.thirdClass.seatsChild = actions.payload.seatsChild;
        state.thirdClass.amountTickets = state.thirdClass.seatsAge + actions.payload.seatsChild;
      };
      if (actions.payload.classType === 'fourth') {
        state.fourthClass.seatsChild = actions.payload.seatsChild;
        state.fourthClass.amountTickets = state.fourthClass.seatsAge + actions.payload.seatsChild;
      };
      const amountTickets = state.firstClass.seatsChild + state.secondClass.seatsChild + state.thirdClass.seatsChild + state.fourthClass.seatsChild;
      state.totalSeatsChild = amountTickets;
      state.totalAmountTickets = state.totalSeatsAge + state.totalSeatsChild;
    },
    changeChildWithoutTickets: (state, actions: PayloadAction<number>) => {
      state.seatsChildWithout = actions.payload;
    },
    changeNumberSeats: (state, actions: PayloadAction<SICoachSeat>) => {
      const someElement = (e: NumberIdCoach) => e.number === actions.payload.seat.number && e.idCoach === actions.payload.seat.idCoach;
      const filterArray = (e: NumberIdCoach) => e.number !== actions.payload.seat.number && e.idCoach === actions.payload.seat.idCoach;
      if (actions.payload.classType === 'first') {
        if (actions.payload.seat.number > 0 && state.firstClass.seatsNumber.some(someElement)) {
          state.firstClass.seatsNumber = state.firstClass.seatsNumber.filter(filterArray);
        } else if (actions.payload.seat.number > 0) {
          state.firstClass.seatsNumber = [...state.firstClass.seatsNumber, actions.payload.seat];
        };
      };
      if (actions.payload.classType === 'second') {
        if (actions.payload.seat.number > 0 && state.secondClass.seatsNumber.some(someElement)) {
          state.secondClass.seatsNumber = state.secondClass.seatsNumber.filter(filterArray);
        } else if (actions.payload.seat.number > 0) {
          state.secondClass.seatsNumber = [...state.secondClass.seatsNumber, actions.payload.seat];
        };
      };
      if (actions.payload.classType === 'third') {
        if (actions.payload.seat.number > 0 && state.thirdClass.seatsNumber.some(someElement)) {
          state.thirdClass.seatsNumber = state.thirdClass.seatsNumber.filter(filterArray);
        } else if (actions.payload.seat.number > 0) {
          state.thirdClass.seatsNumber = [...state.thirdClass.seatsNumber, actions.payload.seat];
        };
      };
      if (actions.payload.classType === 'fourth') {
        if (actions.payload.seat.number > 0 && state.fourthClass.seatsNumber.some(someElement)) {
          state.fourthClass.seatsNumber = state.fourthClass.seatsNumber.filter(filterArray);
        } else if (actions.payload.seat.number > 0) {
          state.fourthClass.seatsNumber = [...state.fourthClass.seatsNumber, actions.payload.seat];
        };
      };
    },
    changePriceSeats: (state, actions: PayloadAction<SIPriceSeat>) => {
      if (actions.payload.classType === 'first') {
        if (state.firstClass.seatsAge > 0) {
          state.firstClass.seatsAge -= 1;
          state.firstClass.seatsPriceAge += actions.payload.price;
        } else if (state.firstClass.seatsChild > 0) {
          state.firstClass.seatsChild -= 1;
          state.firstClass.seatsPriceChild += actions.payload.price;
        };
        state.firstClass.totalPrice += actions.payload.price;
      };

      if (actions.payload.classType === 'second') {
        if (state.secondClass.seatsAge > 0) {
          state.secondClass.seatsAge -= 1;
          state.secondClass.seatsPriceAge += actions.payload.price;
        } else if (state.secondClass.seatsChild > 0) {
          state.secondClass.seatsChild -= 1;
          state.secondClass.seatsPriceChild += actions.payload.price;
        };
        state.secondClass.totalPrice += actions.payload.price;
      };

      if (actions.payload.classType === 'third') {
        if (state.thirdClass.seatsAge > 0) {
          state.thirdClass.seatsAge -= 1;
          state.thirdClass.seatsPriceAge += actions.payload.price;
        } else if (state.thirdClass.seatsChild > 0) {
          state.thirdClass.seatsChild -= 1;
          state.thirdClass.seatsPriceChild += actions.payload.price;
        };
        state.thirdClass.totalPrice += actions.payload.price;
      };

      if (actions.payload.classType === 'fourth') {
        if (state.fourthClass.seatsAge > 0) {
          state.fourthClass.seatsAge -= 1;
          state.fourthClass.seatsPriceAge += actions.payload.price;
        } else if (state.fourthClass.seatsChild > 0) {
          state.fourthClass.seatsChild -= 1;
          state.fourthClass.seatsPriceChild += actions.payload.price;
        };
        state.fourthClass.totalPrice += actions.payload.price;
      };
    },
    changeServiceWifi: (state, actions: PayloadAction<SIPriceSeat>) => {
      if (actions.payload.classType === 'first') {
        state.firstClass.totalPrice += actions.payload.price;
      };
      if (actions.payload.classType === 'second') {
        state.secondClass.totalPrice += actions.payload.price;
      };
      if (actions.payload.classType === 'third') {
        state.thirdClass.totalPrice += actions.payload.price;
      };
      if (actions.payload.classType === 'fourth') {
        state.fourthClass.totalPrice += actions.payload.price;
      };
    },
    changeServiceLinens: (state, actions: PayloadAction<SIPriceSeat>) => {
      if (actions.payload.classType === 'first') {
        state.firstClass.totalPrice += actions.payload.price;
      };
      if (actions.payload.classType === 'second') {
        state.secondClass.totalPrice += actions.payload.price;
      };
      if (actions.payload.classType === 'third') {
        state.thirdClass.totalPrice += actions.payload.price;
      };
      if (actions.payload.classType === 'fourth') {
        state.fourthClass.totalPrice += actions.payload.price;
      };
    },
    changeAmountTickets: (state, actions: PayloadAction<SIAmountTicket>) => {
      if (actions.payload.classType === 'first') {
        state.firstClass.amountTickets += actions.payload.amount;
        state.totalAmountTickets += actions.payload.amount;
      };
      if (actions.payload.classType === 'second') {
        state.secondClass.amountTickets += actions.payload.amount;
        state.totalAmountTickets += actions.payload.amount;
      };
      if (actions.payload.classType === 'third') {
        state.thirdClass.amountTickets += actions.payload.amount;
        state.totalAmountTickets += actions.payload.amount;
      };
      if (actions.payload.classType === 'fourth') {
        state.fourthClass.amountTickets += actions.payload.amount;
        state.totalAmountTickets += actions.payload.amount;
      };
    },
    clearAllPrices: (state) => {
      state.firstClass.seatsAge = 0;
      state.firstClass.seatsChild = 0;
      state.firstClass.amountTickets = 0;
      state.firstClass.seatsPriceAge = 0;
      state.firstClass.seatsPriceChild = 0;
      state.firstClass.totalPrice = 0;
      state.firstClass.seatsNumber = [];

      state.secondClass.seatsAge = 0;
      state.secondClass.seatsChild = 0;
      state.secondClass.amountTickets = 0;
      state.secondClass.seatsPriceAge = 0;
      state.secondClass.seatsPriceChild = 0;
      state.secondClass.totalPrice = 0;
      state.secondClass.seatsNumber = [];

      state.thirdClass.seatsAge = 0;
      state.thirdClass.seatsChild = 0;
      state.thirdClass.amountTickets = 0;
      state.thirdClass.seatsPriceAge = 0;
      state.thirdClass.seatsPriceChild = 0;
      state.thirdClass.totalPrice = 0;
      state.thirdClass.seatsNumber = [];

      state.fourthClass.seatsAge = 0;
      state.fourthClass.seatsChild = 0;
      state.fourthClass.amountTickets = 0;
      state.fourthClass.seatsPriceAge = 0;
      state.fourthClass.seatsPriceChild = 0;
      state.fourthClass.totalPrice = 0;
      state.fourthClass.seatsNumber = [];
    },
    totalChoiceRoute: (state) => {
      state.totalPriceAge = state.firstClass.seatsPriceAge + state.secondClass.seatsPriceAge + state.thirdClass.seatsPriceAge + state.fourthClass.seatsPriceAge;
      state.totalPriceChild = state.firstClass.seatsPriceChild + state.secondClass.seatsPriceChild + state.thirdClass.seatsPriceChild + state.fourthClass.seatsPriceChild;
      state.totalPriceAll = state.firstClass.totalPrice + state.secondClass.totalPrice + state.thirdClass.totalPrice + state.fourthClass.totalPrice;
      state.totalSeatsNumber = [...state.firstClass.seatsNumber, ...state.secondClass.seatsNumber, ...state.thirdClass.seatsNumber, ...state.fourthClass.seatsNumber]
    },
    clearTotalPrice: (state) => {
      state.totalSeatsAge = 0;
      state.totalSeatsChild = 0;
      state.totalAmountTickets = 0;
      state.totalPriceAge = 0;
      state.totalPriceChild = 0;
      state.totalPriceAll = 0;
      state.totalSeatsNumber = [];
    }
  }
});

export const {
  changeAgeTickets,
  changeChildTickets,
  changeChildWithoutTickets,
  changeNumberSeats,
  changePriceSeats,
  changeServiceWifi,
  changeServiceLinens,
  changeAmountTickets,
  clearAllPrices,
  totalChoiceRoute,
  clearTotalPrice
} = slicePrice.actions;

export const slicePriceState = (state: RootState) => state.slicePrice;

export default slicePrice.reducer;
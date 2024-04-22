import { RootState } from '.';
import { IIdName, IItem } from '../types/interfaces';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
  fromDate: string,
  toDate: string,
  fromCity: IIdName | null,
  toCity: IIdName | null,
  searchCity: string,
  route: IItem | null
};

const initialState: State = {
  fromDate: '',
  toDate: '',
  fromCity: null,
  toCity: null,
  searchCity: '',
  route: null
};

export const sliceChoice = createSlice({
  name: 'sliceChoice',
  initialState,
  reducers: {
    choiceDateFrom: (state, actions: PayloadAction<string>) => {
      state.fromDate = actions.payload;
    },
    choiceDateTo: (state, actions: PayloadAction<string>) => {
      state.toDate = actions.payload;
    },
    choiceCityFrom: (state, actions: PayloadAction<IIdName>) => {
      state.fromCity = actions.payload;
    },
    choiceCityTo: (state, actions: PayloadAction<IIdName>) => {
      state.toCity = actions.payload;
    },
    searchCity: (state, actions: PayloadAction<string>) => {
      state.searchCity = actions.payload;
    },
    clearAllCity: (state) => {
      state.toDate = '';
      state.fromDate = '';
      state.toCity = null;
      state.fromCity = null;
    },
    clearChoiceDate: (state) => {
      state.toDate = '';
      state.fromDate = '';
    },
    clearChoiceCity: (state) => {
      state.toCity = null;
      state.fromCity = null;
    },
    choiceRoute: (state, actions: PayloadAction<IItem>) => {
      state.route = actions.payload;
    }
  }
});

export const {
  choiceDateFrom,
  choiceDateTo,
  choiceCityFrom,
  choiceCityTo,
  searchCity,
  clearChoiceCity,
  clearChoiceDate,
  clearAllCity,
  choiceRoute
} = sliceChoice.actions;

export const sliceChoiceState = (state: RootState) => state.sliceChoice

export default sliceChoice.reducer;
import { Filter, FilterSeats, StartEnd } from '../types/types';
import { IItem } from '../types/interfaces';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '.';

type State = {
  currentRoutes: IItem[],
  filteredRoutes: IItem[],
  filterSeats: FilterSeats,
  filterPrices: StartEnd,
  filterTimeFrom: {
    thereDeparture: StartEnd,
    thereArrival: StartEnd
  },
  filterTimeTo: {
    backDeparture: StartEnd,
    backArrival: StartEnd
  },
  filterProcess: boolean
};

const initialState: State = {
  currentRoutes: [],
  filteredRoutes: [],
  filterSeats: {
    coupe: false,
    reserved: false,
    seated: false,
    lux: false,
    wifi: false,
    express: false
  },
  filterPrices: {
    start: 0,
    end: 7000
  },
  filterTimeFrom: {
    thereDeparture: {
      start: 0,
      end: 86400
    },
    thereArrival: {
      start: 0,
      end: 86400
    }
  },
  filterTimeTo: {
    backDeparture: {
      start: 0,
      end: 86400
    },
    backArrival: {
      start: 0,
      end: 86400
    }
  },
  filterProcess: false
};

export const sliceFilter = createSlice({
  name: 'sliceFilter',
  initialState,
  reducers: {
    addRoutes: (state, actions: PayloadAction<IItem[]>) => {
      state.currentRoutes = actions.payload;
      state.filterProcess = false;
    },
    addFilterSeats: (state, actions: PayloadAction<FilterSeats>) => {
      state.filterSeats = actions.payload;
    },
    addFilterPrices: (state, actions: PayloadAction<StartEnd>) => {
      state.filterPrices = actions.payload;
    },
    addFilterTimeFrom: (state, actions: PayloadAction<{ thereDeparture: StartEnd, thereArrival: StartEnd }>) => {
      state.filterTimeFrom = actions.payload;
    },
    addFilterTimeTo: (state, actions: PayloadAction<{ backDeparture: StartEnd, backArrival: StartEnd }>) => {
      state.filterTimeTo = actions.payload;
    },
    filtering: (state, actions: PayloadAction<Filter>) => {
      state.filteredRoutes = [];
      state.filteredRoutes = state.currentRoutes;

      if (actions.payload.date !== '') {
        state.filteredRoutes = state.filteredRoutes.filter((el) =>
          el.departure.from.datetime >= actions.payload.dateForComparison(actions.payload.date)
        );
      };

      if (state.filterSeats.lux) {
        state.filteredRoutes = state.filteredRoutes.filter((el) => el.departure.have_first_class === true);
      };

      if (state.filterSeats.coupe) {
        state.filteredRoutes = state.filteredRoutes.filter((el) => el.departure.have_second_class === true);
      };

      if (state.filterSeats.reserved) {
        state.filteredRoutes = state.filteredRoutes.filter((el) => el.departure.have_third_class === true);
      };

      if (state.filterSeats.seated) {
        state.filteredRoutes = state.filteredRoutes.filter((el) => el.departure.have_fourth_class === true);
      };

      if (state.filterSeats.wifi) {
        state.filteredRoutes = state.filteredRoutes.filter((el) => el.departure.have_wifi === true);
      };

      if (state.filterSeats.express) {
        state.filteredRoutes = state.filteredRoutes.filter((el) => el.departure.is_express === true);
      };

      state.filteredRoutes = actions.payload.filteringPricesRange(
        state.filterPrices.start, state.filterPrices.end, state.filteredRoutes);

      state.filteredRoutes = state.filteredRoutes.filter((el) =>
        actions.payload.timeForSort(el.departure.from.datetime) >
        state.filterTimeFrom.thereDeparture.start &&
        actions.payload.timeForSort(el.departure.from.datetime) <
        state.filterTimeFrom.thereDeparture.end &&
        actions.payload.timeForSort(el.departure.to.datetime) >
        state.filterTimeFrom.thereArrival.start &&
        actions.payload.timeForSort(el.departure.to.datetime) <
        state.filterTimeFrom.thereArrival.end
      );
    },
    stopFiltering: (state) => {
      state.filterProcess = false;
      state.filteredRoutes = [];
    },
    clearAllFiltering: (state) => {
      state.filterProcess = false;
      state.filteredRoutes = [];
      state.currentRoutes = [];
    }
  }
});

export const {
  addRoutes,
  addFilterSeats,
  addFilterPrices,
  addFilterTimeFrom,
  addFilterTimeTo,
  filtering,
  stopFiltering,
  clearAllFiltering
} = sliceFilter.actions;

export const sliceFilterState = (state: RootState) => state.sliceFilter

export default sliceFilter.reducer;
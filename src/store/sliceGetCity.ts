import { createSlice } from "@reduxjs/toolkit";
import { IGetStatus, IIdName } from "../types/interfaces";
import { createAsyncThunk } from '@reduxjs/toolkit'
import httpServices from "../services/httpApi";
import { RootState } from ".";

export const getCityThunk = createAsyncThunk('sliceGetCity/getCityThunk', async (city: string) => {
  const response = await httpServices.getCities(city);
  return response.data
});

const initialState: IGetStatus<IIdName[]> = {
  items: [],
  loading: false,
  error: false
};

export const sliceGetCity = createSlice({
  name: 'sliceGetCity',
  initialState,
  reducers: {
    clearCities: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCityThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCityThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = payload;
      })
      .addCase(getCityThunk.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
  }
});

export const {
  clearCities
} = sliceGetCity.actions;

export const sliceGetCityState = (state: RootState) => state.sliceGetCity

export default sliceGetCity.reducer;
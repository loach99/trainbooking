import { IPostStatus } from '../types/interfaces';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from '../types/types';
import httpServices from '../services/httpApi';
import { RootState } from '.';

export const postOrderThunk = createAsyncThunk('slicePostOrder/postOrderThunk', async (order: Order) => {
  const response = await httpServices.postOrder(order);
  return response.data;
});

const initialState: IPostStatus = {
  status: false,
  loading: false,
  error: false
};

export const slicePostOrder = createSlice({
  name: 'slicePostOrder',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(postOrderThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(postOrderThunk.fulfilled, (state, actions: PayloadAction<boolean>) => {
        state.loading = false;
        state.status = actions.payload;
      })
      .addCase(postOrderThunk.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
  },
});

export const slicePostOrderState = (state: RootState) => state.slicePostOrder

export default slicePostOrder.reducer;
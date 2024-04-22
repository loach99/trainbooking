import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPostStatus } from "../types/interfaces";
import httpServices from "../services/httpApi";
import { RootState } from ".";

export const postSubscribeThunk = createAsyncThunk('slicePostSubscribe/postSubscribeThunk', async (subscribe: string) => {
  const response = await httpServices.postSubscribe(subscribe);
  return response.data;
});

const initialState: IPostStatus = {
  status: false,
  loading: false,
  error: false
};

export const slicePostSubscribe = createSlice({
  name: 'slicePostSubscribe',
  initialState,
  reducers: {
    clearStatusSubscribe: (state) => {
      state.status = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postSubscribeThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(postSubscribeThunk.fulfilled, (state, actions: PayloadAction<boolean>) => {
        state.loading = false;
        state.status = actions.payload;
      })
      .addCase(postSubscribeThunk.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
  }
});

export const {
  clearStatusSubscribe
} = slicePostSubscribe.actions;

export const slicePostSubscribeState = (state: RootState) => state.slicePostSubscribe

export default slicePostSubscribe.reducer;
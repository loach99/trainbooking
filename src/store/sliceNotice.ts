import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

type State = {
  notice: boolean,
  text: string
};

const initialState: State = {
  notice: false,
  text: ''
};

export const sliceNotice = createSlice({
  name: 'sliceNotice',
  initialState,
  reducers: {
    changeNotice: (state, actions: PayloadAction<State>) => {
      state.notice = actions.payload.notice;
      state.text = actions.payload.text;
    }
  }
});

export const {
  changeNotice
} = sliceNotice.actions;

export const sliceNoticeState = (state: RootState) => state.sliceNotice

export default sliceNotice.reducer;
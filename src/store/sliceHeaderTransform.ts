import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

type State = {
  classSearch: string,
  classHeader: string,
  classTitle: string,
  classLine: string,
  transform: boolean,
  success: boolean
};

const initialState: State = {
  classSearch: 'search-widget',
  classHeader: 'header',
  classTitle: 'header-title',
  classLine: 'header-endline',
  transform: false,
  success: false
};

export const sliceHeaderTransform = createSlice({
  name: 'sliceHeaderTransform',
  initialState,
  reducers: {
    transformHeader: (state) => {
      state.classHeader = 'header-transform';
      state.classSearch = 'search-transform';
      state.classTitle = 'none';
      state.classLine = 'none';
      state.transform = true;
      state.success = false;
    },
    transformHeaderToMain: (state) => {
      state.classSearch = 'search-widget';
      state.classHeader = 'header';
      state.classTitle = 'header-title';
      state.classLine = 'header-endline';
      state.transform = false;
      state.success = false;
    },
    transformHeaderSuccess: (state) => {
      state.success = true;
      state.classTitle = 'none';
      state.classSearch = 'none';
      state.classHeader = 'header-success';
    }
  }
});

export const {
  transformHeader,
  transformHeaderToMain,
  transformHeaderSuccess
} = sliceHeaderTransform.actions;

export const sliceHeaderTransformState = (state: RootState) => state.sliceHeaderTransform

export default sliceHeaderTransform.reducer;
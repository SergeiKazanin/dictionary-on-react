import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "diction",
  initialState: {
    word: "",
  },
  reducers: {
    handleChangeText(state, action) {
      state.word = action.payload;
    },
  },
});

export const actionsDiction = slice.actions;
export const sliceReducer = slice.reducer;

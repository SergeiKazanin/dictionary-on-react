import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "diction",
  initialState: {
    word: "",
  },
  reducers: {
    handleChangeText(state, action) {
      console.log(state);
      console.log(action);
      state.word = action.payload.word;
    },
    handleSubmit(state, action) {},
    handleSound(state, action) {},
    handleChangeTheme(state, action) {},
  },
});

export const {
  handleChangeText,
  handleSubmit,
  handleSound,
  handleChangeTheme,
} = slice.actions;

export const sliceReducer =  slice.reducer;
export const sliceAction = slice.actions;
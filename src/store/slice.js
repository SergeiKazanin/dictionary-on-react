import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getRes = createAsyncThunk("diction/getRes", async function (word) {
  if (!word.trim()) return;
  const url =
    "https://www.dictionaryapi.com/api/v3/references/collegiate/json/";

  const resp = await fetch(
    `${url}${word}?key=34c69346-780e-4ac3-a06e-709641223ea1`
  );
  const respRes = await resp.json();
  return respRes;
});

const slice = createSlice({
  name: "diction",
  initialState: {
    word: "",
    res: [],
    error: false,
    status: null,
    errLoad: null,
  },
  reducers: {
    handleChangeText(state, action) {
      state.word = action.payload;
    },

    handleError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: {
    [getRes.pending]: (state) => {
      state.status = "load";
      state.errLoad = null;
    },
    [getRes.fulfilled]: (state, action) => {
      state.res = action.payload;
      state.status = "resolved";
      state.errLoad = null;
    },
    [getRes.rejected]: (state, action) => {
      console.log(action.payload);
    },
  },
});

export const { handleChangeText, handleError } = slice.actions;

export const sliceReducer = slice.reducer;

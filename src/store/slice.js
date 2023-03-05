import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getRes = createAsyncThunk(
  "diction/getRes",
  async function (word, { rejectWithValue }) {
    if (!word.trim()) {
      throw rejectWithValue("Enter a word");
    }
    const url =
      "https://www.dictionaryapi.com/api/v3/references/collegiate/json/";
    try {
      const resp = await fetch(
        `${url}${word}?key=34c69346-780e-4ac3-a06e-709641223ea1`
      );
      if (!resp.ok) {
        return rejectWithValue(resp.status);
      }
      const respRes = await resp.json();
      return respRes;
    } catch (error) {
      throw rejectWithValue(error.message);
    }
  }
);

const slice = createSlice({
  name: "diction",
  initialState: {
    word: "",
    res: [],
    error: null,
    status: null,
    wordSet: "",
  },
  reducers: {
    handleChangeText(state, action) {
      state.word = action.payload;
    },
    handleError(state, action) {
      state.error = action.payload;
    },
    handleStatus(state, action) {
      state.status = action.payload;
    },
    handleWord(state, action) {
      state.wordSet = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRes.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.res = [];
      })
      .addCase(getRes.fulfilled, (state, action) => {
        state.res = action.payload;
        state.status = "resolved";
        state.error = null;
      })
      .addCase(getRes.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
        state.res = [];
      });
  },
});

export const { handleChangeText, handleError, handleStatus, handleWord } =
  slice.actions;

export const sliceReducer = slice.reducer;

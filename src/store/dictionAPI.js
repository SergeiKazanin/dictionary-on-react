import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dictionApi = createApi({
  reducerPath: " dictionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.dictionaryapi.com/api/v3/references/collegiate/json/",
  }),
  endpoints: (builder) => ({
    getWord: builder.query({
      query: (word) => `${word}?key=34c69346-780e-4ac3-a06e-709641223ea1`,
    }),
  }),
});

export const { useGetWordQuery } = dictionApi;

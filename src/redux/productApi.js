import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5500" }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "/pro/allProducts",
    }),
  }),
});

export const { useGetAllProductsQuery } = productsApi;

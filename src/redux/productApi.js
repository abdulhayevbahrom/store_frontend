import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5500" }),
  tagTypes: ["GETPRODUCT", "GET_ALL_CRIDIT", "SCANER_DATA"],
  endpoints: (builder) => ({
    // product API => get api
    getAllProducts: builder.query({
      query: () => "/pro/allProducts",
      providesTags: ["GETPRODUCT"],
    }),
    addPost: builder.mutation({
      query(body) {
        return {
          url: `/pro/create`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["GETPRODUCT"],
    }),
    // product update api =>
    updatePost: builder.mutation({
      query(data) {
        const { updateData } = data;
        return {
          url: `/pro/update/${data?._id}`,
          method: "PUT",
          body: updateData,
        };
      },
      invalidatesTags: ["GETPRODUCT"],
    }),

    // product delete api =>

    deletePost: builder.mutation({
      query(id) {
        return {
          url: `/pro/delete/${id}`,
          method: "DELETE",
        };
      },

      invalidatesTags: ["GETPRODUCT"],
    }),

    // delete all product api =>

    deleteAllProducts: builder.mutation({
      query() {
        return {
          url: `/pro/deleteAllData`,
          method: "DELETE",
        };
      },

      invalidatesTags: ["GETPRODUCT"],
    }),

    // product seach api =>

    searchPost: builder.mutation({
      query(body) {
        return {
          url: `/pro/search`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["GETPRODUCT"],
    }),

    //  scaner API =>

    getScanerData: builder.mutation({
      query(body) {
        return {
          url: `/pro/scan`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["SCANER_DATA"],
    }),

    // CRIDIT API START => API get  all cridit data

    getAllCridit: builder.query({
      query: () => "/creditUser/creditUsers",
      providesTags: ["GET_ALL_CRIDIT"],
    }),

    creditUserDeleteOne: builder.mutation({
      query(id) {
        console.log(id);
        return {
          url: `/creditUser/creditDeleteOneUser/${id}`,
          method: "DELETE",
        };
      },

      invalidatesTags: ["GET_ALL_CRIDIT"],
    }),

    criditFintUser: builder.mutation({
      query(body) {
        let id = body;
        return {
          url: `/creditUser/creditFindUser/${id}`,
          method: "POST",
          body,
        };
      },
      providesTags: ["GET_ALL_CRIDIT"],
    }),

    creditFindRegister: builder.mutation({
      query(body) {
        return {
          url: `/creditUser/creditFindRegister`,
          method: "POST",
          body,
        };
      },
      providesTags: ["GET_ALL_CRIDIT"],
    }),
  }),
});

export const {
  // product API =>

  useGetAllProductsQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
  useAddPostMutation,
  useSearchPostMutation,
  useDeleteAllProductsMutation,

  // get scaner data API =>

  useGetScanerDataMutation,

  // cridit API =>

  useGetAllCriditQuery,
  useCriditFintUserMutation,
  useCreditUserDeleteOneMutation,
  useCreditFindRegisterMutation,
} = productsApi;

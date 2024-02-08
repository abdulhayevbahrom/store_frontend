import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5500" }),
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "/pro/allProducts",
    }),
    addPost: builder.mutation({
      query(body) {
        return {
          url: `/pro/create`,
          method: "POST",
          body,
        };
      },

      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),

    updatePost: builder.mutation({
      query(data) {
        const { updateData } = data;
        return {
          url: `/pro/update/${data?._id}`,
          method: "PUT",
          body: updateData,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Posts", id }],
    }),
    deletePost: builder.mutation({
      query(id) {
        return {
          url: `/pro/deleteAllData/${id}`,
          method: "DELETE",
        };
      },

      invalidatesTags: (result, error, id) => [{ type: "Posts", id }],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
  useAddPostMutation,
} = productsApi;

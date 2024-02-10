import { api } from "./api";

export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    //  GET => CREDIT DATA
    getAllCriditData: builder.query({
      query: () => "/creditUser/creditUsers",
      providesTags: ["GET_ALL_CRIDIT"],
    }),

    // DELETE => CRIDIT DELETE ONE USER
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

    //   POST => CREDIT FIND USER
    criditFintUser: builder.mutation({
      query(body) {
        let id = body;
        return {
          url: `/creditUser/creditFindUser/${id}`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["GET_ALL_CRIDIT"],
    }),

    //  POST => CREDIT REGISTER FIND USER
    creditFindRegister: builder.mutation({
      query(body) {
        return {
          url: `/creditUser/creditFindRegister`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["GET_ALL_CRIDIT"],
    }),
  }),
});

export const {
  useCreditFindRegisterMutation,
  useCreditUserDeleteOneMutation,
  useCriditFintUserMutation,
  useGetAllCriditDataQuery,
} = productApi;

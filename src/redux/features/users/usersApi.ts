import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const UsersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsersOverview: builder.query({
      query: () => "/users/stats",
      providesTags: [tagTypes.users],
    }),
    getAllUsers: builder.query({
      query: ({ page, limit, searchTerm }) => ({
        url: `/users`,
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: [tagTypes.users],
    }),
    getAllPendingProfessionals: builder.query({
      query: ({ page, limit, searchTerm }) => ({
        url: `/users/pending-professionals`,
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: [tagTypes.users],
    }),
    approveProfessional: builder.mutation({
      query: (req) => ({
        url: `/users/verified/${req.params}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.users],
    }),
    declineProfessional: builder.mutation({
      query: (req) => ({
        url: `/users/declined/${req.params}`,
        method: "PATCH",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.users],
    }),
  }),
});

export const {
  useGetAllUsersOverviewQuery,
  useGetAllUsersQuery,
  useGetAllPendingProfessionalsQuery,
  useApproveProfessionalMutation,
  useDeclineProfessionalMutation,
} = UsersApi;

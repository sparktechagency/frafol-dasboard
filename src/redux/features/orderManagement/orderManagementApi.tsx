import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const orderManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrderManagement: builder.query({
      query: ({ page, limit, searchTerm }) => {
        return {
          url: "/event-order",
          method: "GET",
          params: { page, limit, searchTerm },
        };
      },
      providesTags: [tagTypes.orderManagement],
    }),
    cancelOrder: builder.mutation({
      query: (req) => ({
        url: `/event-order/cancel/${req?.params}`,
        method: "PATCH",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.orderManagement],
    }),
  }),
});

export const { useGetAllOrderManagementQuery, useCancelOrderMutation } =
  orderManagementApi;

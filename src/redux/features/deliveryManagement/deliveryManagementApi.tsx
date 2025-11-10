import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const deliveryManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDeliveryManagement: builder.query({
      query: ({ page, limit, searchTerm, type }) => ({
        url: `/users/delivery-orders?page=${page}&limit=${limit}&searchTerm=${searchTerm}&type=${type}`,
        method: "GET",
      }),
      providesTags: [tagTypes.deliveryManagement],
    }),
    // updateCommissionSetup: builder.mutation({
    //   query: (req) => ({
    //     url: `/commissionSetup/update`,
    //     method: "PATCH",
    //     body: req.body, // Passing the body from the request
    //   }),
    //   invalidatesTags: ["CommissionSetup"],
    // }),
  }),
}); //commissionSetup

export const { useGetDeliveryManagementQuery } = deliveryManagementApi;

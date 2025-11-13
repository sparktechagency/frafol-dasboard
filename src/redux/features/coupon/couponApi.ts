import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCoupon: builder.query({
      query: ({ path }) => ({
        url: `/category/type/${path}`,
        method: "GET",
      }),
      providesTags: [tagTypes.coupon],
    }),
    addCoupon: builder.mutation({
      query: (req) => ({
        url: `coupon`,
        method: "POST",
        body: req.body, // Passing the body from the request
      }),
      invalidatesTags: [tagTypes.coupon],
    }),
    updateCoupon: builder.mutation({
      query: (req) => ({
        url: `/category/update/${req.params.id}`,
        method: "PATCH",
        body: req.body, // Passing the body from the request
      }),
      invalidatesTags: [tagTypes.coupon],
    }),
    deleteCoupon: builder.mutation({
      query: (req) => ({
        url: `/category/${req.params.id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.coupon],
    }),
  }),
});

export const {
  useGetCouponQuery,
  useAddCouponMutation,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
} = couponApi;

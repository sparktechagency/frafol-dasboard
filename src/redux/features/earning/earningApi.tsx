import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";
// import { tagTypes } from "../../tagTypes";

const earningApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEarnings: builder.query({
      query: ({ page, limit, searchTerm }) => {
        return {
          url: "/payment/earnings",
          method: "GET",
          params: { page, limit, searchTerm },
        };
      },
      providesTags: [tagTypes.earning],
    }),
  }),
});

export const { useGetEarningsQuery } = earningApi;

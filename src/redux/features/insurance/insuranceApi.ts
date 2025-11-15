import { baseApi } from "../../api/baseApi";

const insuranceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllInsurance: builder.query({
      query: ({ page, limit, searchTerm }) => {
        return {
          url: "/insurange/all",
          method: "GET",
          params: { page, limit, searchTerm },
        };
      },
    }),
  }),
});

export const { useGetAllInsuranceQuery } = insuranceApi;

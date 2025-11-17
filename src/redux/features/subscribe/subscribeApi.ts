import { baseApi } from "../../api/baseApi";

const subscribeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubscribe: builder.query({
      query: ({ page, limit }) => ({
        url: `/subscribe`,
        method: "GET",
        params: { page, limit },
      }),
    }),
  }),
});

export const { useGetSubscribeQuery } = subscribeApi;

import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const feedbackApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeedback: builder.query({
      query: ({ page, limit, searchTerm }) => ({
        url: `/feedback`,
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: [tagTypes.feedback],
    }),
  }),
});

export const { useGetFeedbackQuery } = feedbackApi;

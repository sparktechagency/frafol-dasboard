import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const settingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: ({ path }) => ({
        url: `/category/type/${path}`,
        method: "GET",
      }),
      providesTags: [tagTypes.category],
    }),
    addCategory: builder.mutation({
      query: (req) => ({
        url: `/category/add`,
        method: "POST",
        body: req.body, // Passing the body from the request
      }),
      invalidatesTags: [tagTypes.category],
    }),
    updateCategory: builder.mutation({
      query: (req) => ({
        url: `/category/update/${req.params.id}`,
        method: "PATCH",
        body: req.body, // Passing the body from the request
      }),
      invalidatesTags: [tagTypes.category],
    }),
    deleteCategory: builder.mutation({
      query: (req) => ({
        url: `/category/${req.params.id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.category],
    }),
  }),
});

export const {
  useGetCategoryQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = settingApi;

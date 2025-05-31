import { MainApi } from "../../store/MainApi.js";

const orderApi = MainApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (token) => ({
        url: "/orders",
        method: "GET",
        headers: {
          Authorization: token,
        },
      }),
      providesTags: ["Orders"],
    }),

    getOrderDetail: builder.query({
      query: (q) => ({
        url: `/orders/${q.id}`,
        method: "GET",
        headers: {
          Authorization: q.token,
        },
      }),
      providesTags: ["Orders"],
    }),

    createOrder: builder.mutation({
      query: (q) => ({
        url: "/orders",
        method: "POST",
        body: q.body,
        headers: {
          Authorization: q.token,
        },
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailQuery,
  useGetOrdersQuery,
} = orderApi;

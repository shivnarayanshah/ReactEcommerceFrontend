import { MainApi } from "../../store/MainApi.js";

export const productsApi = MainApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
      providesTags: ["Products"],
    }),

    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["Products"],
    }),

    addProduct: builder.mutation({
      query: (q) => ({
        url: "/products",
        method: "POST",
        body: q.body,
        headers: {
          authorization: q.token,
        },
      }),
      invalidatesTags: ["Products"],
    }),

    updateProduct: builder.mutation({
      query: (q) => ({
        url: `/product/${q.id}`,
        body: q.body,
        method: "PATCH",
        headers: {
          Authorization: q.token,
        },
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: (q) => ({
        url: `/product/${q.id}`,
        method: "DELETE",
        headers: {
          Authorization: q.token,
        },
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useGetSingleProductQuery,
  useUpdateProductMutation,
} = productsApi;

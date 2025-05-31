import { MainApi } from "../../store/MainApi.js";

export const userApi = MainApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => ({
        url: "/users/register",
        method: "POST",
        body: data,
      }),
    }),

    loginUser: builder.mutation({
      query: (data) => ({
        url: "/users/login",
        method: "POST",
        body: data,
      }),
    }),

    getUserProfile: builder.query({
      query: (token) => ({
        url: "/users/profile",
        method: "GET",
        headers: {
          Authorization: token,
        },
      }),
      providesTags: ["users"],
    }),
    updateUserProfile: builder.mutation({
      query: (q) => ({
        url: "/users/profile",
        body: q.body,
        method: "PATCH",
        headers: {
          Authorization: q.token,
        },
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} = userApi;

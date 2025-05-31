import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseUrl = "http://localhost:5000";

// ip of my laptop changes whenever i reconnect wifi network so i am using localhost for testing
// export const baseUrl = "http://192.168.97.11:5000";

export const MainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/api` }),
  endpoints: (builder) => ({}),
});

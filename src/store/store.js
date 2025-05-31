import { configureStore } from "@reduxjs/toolkit";
import { MainApi } from "./MainApi.js";
import { userSlice } from "../features/users/userSlice.js";
import { cartSlice } from "../features/carts/cartSlice.js";

const store = configureStore({
  reducer: {
    [MainApi.reducerPath]: MainApi.reducer,
    [userSlice.name]: userSlice.reducer,
    [cartSlice.name]: cartSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([MainApi.middleware]),
});

export default store;

import { createSlice } from "@reduxjs/toolkit";
import {
  getUserFromLocal,
  removeUserFromLocal,
  setUsertoLocal,
} from "../../store/localStorage/localStorage.js";

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    user: getUserFromLocal(),
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      setUsertoLocal(state.user);
    },

    removeUser: (state, action) => {
      state.user = "";
      removeUserFromLocal();
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

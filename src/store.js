import { configureStore } from "@reduxjs/toolkit";
import userLoginInfo from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    userLoginInfo: userLoginInfo,
  },
});

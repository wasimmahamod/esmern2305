import { configureStore } from "@reduxjs/toolkit";
import userLoginInfo from "./slices/userSlice";
import chatSlice from "./slices/chatSlice";

export const store = configureStore({
  reducer: {
    userLoginInfo: userLoginInfo,
    activeUserMsg: chatSlice
  },
});

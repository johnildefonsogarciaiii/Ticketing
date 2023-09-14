import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import displayReducer from "./displaySlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    display: displayReducer,
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import displayReducer from "./displaySlice";
import ticketReducer from './ticketSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    display: displayReducer,
    ticket: ticketReducer
  },
});

export default store;

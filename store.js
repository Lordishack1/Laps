import { configureStore } from "@reduxjs/toolkit";
import reducer from "./app/reducers/reducers";

const store = configureStore({
  reducer: {
    auth: reducer,
    // Add other reducers if needed
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";

import conversationReducer from "./conversationSlice.js";

const store = configureStore({
  reducer: {
    user: userReducer,

    conversation: conversationReducer,
  },
});
export default store;

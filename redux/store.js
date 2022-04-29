import { configureStore } from "@reduxjs/toolkit";
import siteUser from "./siteUser";

const reduxStore = configureStore({
  reducer: {
    siteUser,
  },
});

export default reduxStore;

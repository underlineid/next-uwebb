import { createSlice } from "@reduxjs/toolkit";

export const siteUser = createSlice({
  name: "siteUser",
  initialState: {
    value: false,
  },
  reducers: {
    setSiteUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSiteUser } = siteUser.actions;
export default siteUser.reducer;

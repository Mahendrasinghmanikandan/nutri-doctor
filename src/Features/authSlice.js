import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { values: { user: {} } },
  reducers: {
    change: (state, action) => {
      state.values = action.payload;
    },
  },
});

export const { change } = authSlice.actions;
export default authSlice.reducer;

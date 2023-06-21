import { createSlice } from "@reduxjs/toolkit";

let usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setAllUsers: (_, action) => {
      return action.payload;
    },
  },
});
export const { setAllUsers} = usersSlice.actions;
export default usersSlice.reducer;

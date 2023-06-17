import { createSlice } from "@reduxjs/toolkit";

let profilePhotoSlice = createSlice({
  name: "profile photos",
  initialState: [],
  reducers: {
    setProfilePhotos: (_, action) => {
      return action.payload;
    },
    addProfilePhoto: (state, action) => {
      state.unshift(action.payload);
    },
  },
});
export const { setProfilePhotos, addProfilePhoto } =
  profilePhotoSlice.actions;
export default profilePhotoSlice.reducer;

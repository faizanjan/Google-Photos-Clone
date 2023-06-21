import { createSlice } from "@reduxjs/toolkit";

let sharedPhotoSlice = createSlice({
  name: "shared photos",
  initialState: [],
  reducers: {
    setSharedPhotos: (_, action) => {
      return action.payload;
    },
    // addSharedPhoto: (state, action) => {
    //   return [action.payload, ...state]
    // },
    // deleteSharedPhoto: (state, action) => {
    //   const updatedPhotos = state.filter(photo=>photo.id !== action.payload)
    //   return updatedPhotos;
    // },
  },
});
export const { setSharedPhotos, addSharedPhoto, deleteSharedPhoto } = sharedPhotoSlice.actions;
export default sharedPhotoSlice.reducer;

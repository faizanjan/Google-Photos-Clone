import { createSlice } from "@reduxjs/toolkit";

let sharedPhotoSlice = createSlice({
  name: "shared photos",
  initialState: [],
  reducers: {
    setSharedPhotos: (_, action) => {
      return action.payload;
    },
    deleteSharedPhoto: (state, action) => {
      let receivedOrSent= action.payload.wasPhotoSent? "sentPhotos":"receivedPhotos";
      const updatedPhotos = state[receivedOrSent].filter(photo=>photo.id !== action.payload.photoId)
      state[receivedOrSent] = updatedPhotos;
    },
  },
});
export const { setSharedPhotos, deleteSharedPhoto } = sharedPhotoSlice.actions;
export default sharedPhotoSlice.reducer;

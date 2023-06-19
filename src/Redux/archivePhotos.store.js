import { createSlice } from "@reduxjs/toolkit";

let archivePhotoSlice = createSlice({
  name: "archive",
  initialState: [],
  reducers: {
    setArchivePhotos: (_, action) => {
      return action.payload;
    },
    archivePhoto: (state, action) => {
      return [action.payload, ...state];
    },
    unArchivePhoto: (state, action) => {
      const updatedPhotos = state.filter(photo=>photo.id !== action.payload)
      return updatedPhotos;
    },
  },
});
export const { setArchivePhotos, archivePhoto, unArchivePhoto} = archivePhotoSlice.actions;
export default archivePhotoSlice.reducer;

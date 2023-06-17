import { createSlice } from "@reduxjs/toolkit";

let photoSlice = createSlice({
  name: "photos",
  initialState: [],
  reducers: {
    setPhotos: (_, action) => {
      return action.payload;
    },
    addPhoto: (state, action) => {
      state.unshift(action.payload);
    },
    deletePhoto: (state, action) => {
      const updatedPhotos = state.map((photo, index) => {
        if (photo.id === action.payload) {
          return null;
        }
        return { ...photo, index: index - (index > photo.index ? 1 : 0) };
      }).filter(Boolean);
      return updatedPhotos;
    },
  },
});
export const { setPhotos, addPhoto, deletePhoto } = photoSlice.actions;
export default photoSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

let photoSlice = createSlice({
  name: "photos",
  initialState: [],
  reducers: {
    setPhotos: (state, action) => {
      return action.payload;
    },
    addPhoto: (state, action) => {
      state.unshift(action.payload);
    },
    deletePhoto: (state, action) => {
      state = state.filter((photo) => photo.id !== action.payload);
      return state;
    },
  },
});
export const { setPhotos, addPhoto, deletePhoto } = photoSlice.actions;
export default photoSlice.reducer;

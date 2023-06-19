import { createSlice } from "@reduxjs/toolkit";

let favPhotoSlice = createSlice({
  name: "favourites",
  initialState: [],
  reducers: {
    setFavPhotos: (_, action) => {
      return action.payload;
    },
    addPhotoToFav: (state, action) => {
      return [action.payload, ...state];
    },
    removePhotoFromFav: (state, action) => {
      const updatedPhotos = state.filter(photo=>photo.id !== action.payload)
      return updatedPhotos;
    },
  },
});
export const { setFavPhotos, addPhotoToFav, removePhotoFromFav} = favPhotoSlice.actions;
export default favPhotoSlice.reducer;

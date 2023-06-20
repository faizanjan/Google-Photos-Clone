import { createSlice } from "@reduxjs/toolkit";

let albumSlice = createSlice({
  name: "albums",
  initialState: {},
  reducers: {
    setAlbums: (state, action) => {
      return action.payload;
    },
    addAlbum: (state, action) => {},
    deleteAlbum: (state, action) => {},
    setPhotosInAlbum: (state, action) => {},
    addPhotoToAlbum: (state, action) => {},
    deletePhotoFromAlbum: (state, action) => {},
  },
});

export const {
  setAlbums,
  addAlbum,
  deleteAlbum,
  setPhotosInAlbum,
  addPhotoToAlbum,
  deletePhotoFromAlbum,
} = albumSlice.actions;

export default albumSlice.reducer;

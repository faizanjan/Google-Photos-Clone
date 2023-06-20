import { createSlice } from "@reduxjs/toolkit";

let albumSlice = createSlice({
  name: "albums",
  initialState: {},
  reducers: {
    setAlbums: (_, action) => {
      return action.payload;
    },
    addAlbum: (state, action) => {
        let newAlbum = action.payload;
        return {...state, albumId: newAlbum.albumId }
    },
    deleteAlbum: (state, action) => {
        let newState = Object.keys(state).reduce((acc,albumId)=>{
            if(albumId === action.payload) return acc;
            else {
                acc[albumId]=state[albumId];
                return acc;
            }
        }, {})
        return newState;
    },
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

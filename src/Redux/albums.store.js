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
      state[newAlbum.albumId] = newAlbum;
    },
    deleteAlbum: (state, action) => {
      let newState = Object.keys(state).reduce((acc, albumId) => {
        if (albumId === action.payload) return acc;
        else {
          acc[albumId] = state[albumId];
          return acc;
        }
      }, {});
      return newState;
    },
    updateAlbumName: (state, action) => {
      let { docId, albumName } = action.payload;
      state[docId].albumName = albumName;
    },
    addPhotosToAlbum: (state, action) => {
      const { albumId, newPhotosArr } = action.payload;
      const album = state[albumId];
    
      state[albumId] = {
        ...album,
        photos: [...album.photos, ...newPhotosArr],
      };
    },
  
    deletePhotoFromAlbum: (state, action) => {
      const { albumId, photoId } = action.payload;
      const album = state[albumId];
      const updatedPhotos = album.photos.filter(
        (photo) => photo.idInAlbum !== photoId
      );

      state[albumId] = {
        ...album,
        photos: updatedPhotos,
      };
    },
  },
});

export const {
  setAlbums,
  addAlbum,
  deleteAlbum,
  updateAlbumName,
  addPhotosToAlbum,
  deletePhotoFromAlbum,
} = albumSlice.actions;

export default albumSlice.reducer;

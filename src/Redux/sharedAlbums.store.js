import { createSlice } from "@reduxjs/toolkit";

const sharedAlbumsSlice = createSlice({
  name: "sharedAlbums",
  initialState: [],
  reducers: {
    setSharedAlbums: (_, action) => {
      return action.payload;
    },
    deleteSharedAlbum: (state, action) => {
      const albumId = action.payload.albumId;
      const updatedAlbums = state.filter(album => album.id !== albumId);
      return updatedAlbums;
    },
    deletePhotoFromAlbum: (state, action) => {
      const { albumId, photoId } = action.payload;
      const albumIndex = state.findIndex(album => album.id === albumId);
      if (albumIndex !== -1) {
        const album = state[albumIndex];
        const updatedPhotos = album.photos.filter(photo => photo.id !== photoId);
        state[albumIndex] = {
          ...album,
          photos: updatedPhotos,
        };
      }
    },
  },
});

export const {
  setSharedAlbums,
  deleteSharedAlbum,
  deletePhotoFromAlbum,
} = sharedAlbumsSlice.actions;

export default sharedAlbumsSlice.reducer;

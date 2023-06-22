import { createSlice } from "@reduxjs/toolkit";

const sharedAlbumsSlice = createSlice({
  name: "sharedAlbums",
  initialState: {},
  reducers: {
    setSharedAlbums: (_, action) => {
      return action.payload;
    },
    deleteSharedAlbum: (state, action) => {
      let receivedOrSent = action.payload.wasAlbumSent
        ? "sentAlbums"
        : "receivedAlbums";
      const updatedAlbums = state[receivedOrSent].filter(
        (album) => album.albumId !== action.payload.albumId
      );
      state[receivedOrSent] = updatedAlbums;
    },
    deletePhotoFromAlbum: (state, action) => {
      const { albumId, photoId } = action.payload;
      const albumIndex = state.findIndex((album) => album.id === albumId);
      if (albumIndex !== -1) {
        const album = state[albumIndex];
        const updatedPhotos = album.photos.filter(
          (photo) => photo.id !== photoId
        );
        state[albumIndex] = {
          ...album,
          photos: updatedPhotos,
        };
      }
    },
  },
});

export const { setSharedAlbums, deleteSharedAlbum, deletePhotoFromAlbum } =
  sharedAlbumsSlice.actions;

export default sharedAlbumsSlice.reducer;

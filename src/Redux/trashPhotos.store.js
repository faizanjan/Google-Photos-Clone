import { createSlice } from "@reduxjs/toolkit";

let trashPhotoSlice = createSlice({
  name: "bin",
  initialState: [],
  reducers: {
    setTrashPhotos: (_, action) => {
      return action.payload;
    },
    addPhotoToTrash: (state, action) => {
      const newPhoto = { ...action.payload, index: -1 };
      const updatedState = [newPhoto, ...state];
    
      return updatedState.map((photo) => ({
        ...photo,
      }));
    },
    removePhotoFromTrash: (state, action) => {
      const updatedPhotos = state.filter(photo=>photo.id !== action.payload)
      return updatedPhotos;
    },
  },
});
export const { setTrashPhotos, addPhotoToTrash, removePhotoFromTrash} = trashPhotoSlice.actions;
export default trashPhotoSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

let photoSlice = createSlice({
  name: "photos",
  initialState: [],
  reducers: {
    setPhotos: (_, action) => {
      return action.payload;
    },
    addPhoto: (state, action) => {
      const newPhoto = { ...action.payload, index: -1 };
      const updatedState = [newPhoto, ...state];
    
      return updatedState.map((photo) => ({
        ...photo,
        index: photo.index + 1,
      }));
    },
    deletePhoto: (state, action) => {
      const updatedPhotos = state.filter(photo=>photo.id !== action.payload)
      .map((photo, index) => {
        return { ...photo, index};
      })
      return updatedPhotos;
    },
    toggleFav: (state, action)=>{
      const updatedPhotos = state.map(photo=>{
        if(photo.id!==action.payload) return photo;
        else return {
          ...photo,
          isFavourite: !photo.isFavourite
        }
      })
      return updatedPhotos;
    },
    moveToBin: (state, action)=>{
      const updatedPhotos = state.map(photo=>{
        if(photo.id!==action.payload) return photo;
        else return {
          ...photo,
          isDeleted: !photo.isDeleted
        }
      })
      return updatedPhotos;
    }
  },
});
export const { setPhotos, addPhoto, deletePhoto, toggleFav, moveToBin } = photoSlice.actions;
export default photoSlice.reducer;

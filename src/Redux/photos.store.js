import { createSlice } from "@reduxjs/toolkit";

let photoSlice = createSlice({
  name: "photos",
  initialState: [],
  reducers: {
    setPhotos: (_, action) => {
      return action.payload;
    },
    addPhoto: (state, action) => {
      return [action.payload, ...state]
    },
    deletePhoto: (state, action) => {
      const updatedPhotos = state.filter(photo=>photo.id !== action.payload)
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
  },
});
export const { setPhotos, addPhoto, deletePhoto, toggleFav } = photoSlice.actions;
export default photoSlice.reducer;

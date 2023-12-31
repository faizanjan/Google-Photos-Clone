import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import photosReducer from "./Redux/photos.store";
import favPhotosReducer from "./Redux/favPhotos.store";
import trashPhotosReducer from "./Redux/trashPhotos.store";
import archivePhotosReducer from "./Redux/archivePhotos.store";
import profilePhotosReducer from "./Redux/profilePhoto.store";
import albumsReducer from "./Redux/albums.store";
import usersReducer from "./Redux/users.store";
import sharingReducer from "./Redux/sharedPhotos.store";
import sharedAlbumsReducer from "./Redux/sharedAlbums.store";

import App from "./App.jsx";

let rootReducer = combineReducers({
  profilePhoto: profilePhotosReducer,
  photos: photosReducer,
  favourites : favPhotosReducer,
  bin: trashPhotosReducer,
  archived : archivePhotosReducer,
  albums: albumsReducer,
  allUsers: usersReducer,
  sharedPhotos: sharingReducer,
  sharedAlbums: sharedAlbumsReducer
});

const store = configureStore({
  reducer: rootReducer,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);

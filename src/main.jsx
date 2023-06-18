import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import photosReducer from "./Redux/photos.store";
import trashPhotosReducer from "./Redux/trashPhotos.store";
import profilePhotosReducer from "./Redux/profilePhoto.store";

import App from "./App.jsx";

let rootReducer = combineReducers({
  photos: photosReducer,
  profilePhoto: profilePhotosReducer,
  bin: trashPhotosReducer
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

import { createContext, useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setPhotos } from "../Redux/photos.store.js";
import { setFavPhotos } from "../Redux/favPhotos.store.js";
import { setTrashPhotos } from "../Redux/trashPhotos.store.js";
import { Routes, Route, useLocation } from "react-router-dom";
import { getPhotoUrls } from "../modules/getPhotos.js";
import {
  createPhotosArr,
  filterPhotosByPath,
} from "../modules/processPhotos.js";

import NavBar from "./NavBar";
import Aside from "./Aside";
import Photos from "./Photos";
import Favourites from "./Favourites";
import Archive from "./Archive";
import Bin from "./Bin";
import Backdrop from "./secondary_components/Backdrop.jsx";
import PhotoCarousel from "./PhotoCarousel.jsx";
import ComingSoon from "./secondary_components/ComingSoon.jsx";

export let CarouselContext = createContext();

const Home = () => {
  let { pathname } = useLocation();

  const [showCarousel, setShowCarousel] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  let photos_from_redux = useSelector((state) => state);
  let photos = createPhotosArr(photos_from_redux.photos);
  let trashPhotos = createPhotosArr(photos_from_redux.bin);
  let archivedPhotos = createPhotosArr(photos_from_redux.archived);
  let favPhotos = createPhotosArr(photos_from_redux.favourites);

  let getCarouselPhotos = () => {
    if (pathname === "/home/bin") {
      return trashPhotos;
    } else if (pathname === "/home/archive") {
      return archivedPhotos;
    } else if (pathname === "/home/favourites") {
      return favPhotos;
    } else if (pathname === "/home/photos") {
      return photos;
    }
  };

  let { currentUser } = useAuth();
  let dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      getPhotoUrls(currentUser).then((tempPhotosState) => {
        tempPhotosState = filterPhotosByPath(tempPhotosState, pathname);
        dispatch(setPhotos(tempPhotosState.photos));
        dispatch(setFavPhotos(tempPhotosState.favourites));
        dispatch(setTrashPhotos(tempPhotosState.bin));
      });
    }
  }, [currentUser, pathname]);

  if (!currentUser) return <Backdrop />;

  return (
    <div>
      <CarouselContext.Provider value={{ setShowCarousel, setActiveIndex }}>
        <NavBar />
        <div className="d-flex flex-row">
          <Aside pathname={pathname} />
          <Routes>
            <Route path="photos" element={<Photos photos={photos} />} />
            <Route path="explore" element={<ComingSoon />} />
            <Route path="sharing" element={<ComingSoon />} />
            <Route
              path="favourites"
              element={<Favourites photos={favPhotos} />}
            />
            <Route path="albums" element={<ComingSoon />} />
            <Route path="utilities" element={<ComingSoon />} />
            <Route path="archive" element={<Archive photos={archivedPhotos} />} />
            <Route path="bin" element={<Bin photos={trashPhotos} />} />
          </Routes>
          {showCarousel && (
            <PhotoCarousel
              photos={getCarouselPhotos()}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              setShowCarousel={setShowCarousel}
            />
          )}
        </div>
      </CarouselContext.Provider>
    </div>
  );
};

export default Home;

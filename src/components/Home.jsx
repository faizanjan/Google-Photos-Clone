import { createContext, useEffect, useState } from "react";
import { db, storage } from "../firebase/firebase.config.js";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useDispatch, useSelector } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref, getMetadata } from "firebase/storage";
import { setPhotos } from "../Redux/photos.store.js";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  createPhotosArr,
  createPhotoObj,
  filterPhotosByPath,
} from "../modules/processPhotos.js";

import NavBar from "./NavBar";
import Aside from "./Aside";
import Photos from "./Photos";
import Favourites from "./Favourites";
import Bin from "./Bin";
import Backdrop from "./secondary_components/Backdrop.jsx";
import PhotoCarousel from "./PhotoCarousel.jsx";

export let CarouselContext = createContext();

const Home = () => {
  let { pathname } = useLocation();

  const [showCarousel, setShowCarousel] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  let photos_from_redux = useSelector((state) => state.photos);
  let photos = createPhotosArr(photos_from_redux);

  let { currentUser } = useAuth();
  let dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) getPhotoUrls();
  }, [currentUser, pathname]);

  if (!currentUser) return <Backdrop />;

  const usersCollection = collection(db, "Users");
  const photosCollection = collection(
    usersCollection,
    currentUser.uid,
    "Photos"
  );

  async function getPhotoUrls() {
    let photoDocs = await getDocs(photosCollection);
    let photoObjs = photoDocs.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    let tempPhotosState = [];

    await Promise.all(
      photoObjs.map(async (obj) => {
        let photoRef = ref(storage, obj.path);
        let { timeCreated } = await getMetadata(photoRef);
        let url = await getDownloadURL(photoRef);
        tempPhotosState = [
          ...tempPhotosState,
          createPhotoObj(obj, url, timeCreated),
        ];
        tempPhotosState = filterPhotosByPath(tempPhotosState, pathname);
        tempPhotosState = tempPhotosState.map((photoObj, index) => ({
          ...photoObj,
          index,
        }));
      })
    );

    dispatch(setPhotos(tempPhotosState));
  }
  return (
    <div>
      <CarouselContext.Provider value={{ setShowCarousel, setActiveIndex }}>
        <NavBar />
        <div className="d-flex flex-row">
          <Aside pathname={pathname} />
          <Routes>
            <Route path="photos" element={<Photos photos={photos} />} />
            <Route path="favourites" element={<Favourites photos={photos} />} />
            <Route path="bin" element={<Bin photos={photos}/>} />
          </Routes>
          {showCarousel && (
            <PhotoCarousel
              photos={photos}
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

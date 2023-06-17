import { createContext, useEffect, useState } from "react";
import { db, storage } from "../firebase/firebase.config.js";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useDispatch, useSelector } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref, getMetadata } from "firebase/storage";
import { setPhotos } from "../Redux/photos.store.js";

import MonthGrid from "./MonthGrid.jsx";
import PhotoCarousel from "./PhotoCarousel.jsx";
import Backdrop from "./secondary_components/Backdrop.jsx";

export let CarouselContext = createContext();

function Photos() {
  const [showCarousel, setShowCarousel] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  let photos = useSelector((state) => state.photos)
    .map((photo) => {
      return { ...photo, timeCreated: new Date(photo.timeCreated) };
    })
    .reduce((acc, photo) => {
      let key =
        photo.timeCreated.getMonth() + "/" + photo.timeCreated.getFullYear();
      if (acc[key]) acc[key].push(photo);
      else acc[key] = [photo];
      return acc;
    }, {});

  let { currentUser } = useAuth();
  let dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) getPhotoUrls();
  }, [currentUser]);

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
          { id: obj.id, path: obj.path, timeCreated, url },
        ];
        tempPhotosState.sort((a, b) =>
          b?.timeCreated.localeCompare(a?.timeCreated)
        );
        tempPhotosState = tempPhotosState.map((photoObj, index) => ({
          ...photoObj,
          index,
        }));
      })
    );
  
    dispatch(setPhotos(tempPhotosState));
  }
  

  return (
    <CarouselContext.Provider value={{ setShowCarousel, setActiveIndex }}>
      <div
        className="photos-container ms-2"
        style={{
          position: "relative",
          overflowY: "scroll",
        }}
      >
        <div className="month-grid">
          {Object.keys(photos).map((month) => {
            return <MonthGrid key={month} monthPhotos={photos[month]} />;
          })}
        </div>

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
  );
}

export default Photos;

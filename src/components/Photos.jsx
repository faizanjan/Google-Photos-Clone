import { createContext, useContext, useEffect, useState } from "react";
import { db, storage } from "../firebase/firebase.config.js";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useDispatch, useSelector } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref, getMetadata } from "firebase/storage";
import { setPhotos } from "../Redux/photos.store.js";

import MonthGrid from "./MonthGrid.jsx";
import PhotoCarousel from "./PhotoCarousel.jsx";

export let CarouselContext = createContext();

function Photos() {
  const [showCarousel, setShowCarousel] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  let photos = useSelector((state) => {
    return state.photos;
    // return [...state.photos].sort((a, b) =>
    //   b?.timeCreated.localeCompare(a?.timeCreated)
    // );
  })
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

  const usersCollection = collection(db, "Users");
  const photosCollection = collection(
    usersCollection,
    currentUser.uid,
    "Photos"
  );

  useEffect(() => {
    getPhotoUrls();
  }, []);

  async function getPhotoUrls() {
    let photoDocs = await getDocs(photosCollection);
    let photoObjs = photoDocs.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    let tempPhotosState = [];

    photoObjs.forEach(async (obj) => {
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
      dispatch(setPhotos(tempPhotosState.map((photoObj, index)=>({...photoObj, index}))));
    });
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
          {Object.keys(photos).map((month, index) => {
            return <MonthGrid key={month} monthPhotos={photos[month]} />;
          })}
        </div>

        {showCarousel && (
          <PhotoCarousel photos={photos} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
        )}
      </div>
    </CarouselContext.Provider>
  );
}

export default Photos;

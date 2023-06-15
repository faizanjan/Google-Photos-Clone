import { useEffect } from "react";
import { db, storage } from "../firebase/firebase.config.js";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useDispatch, useSelector } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { setPhotos } from "../Redux/photos.store.js";

import Photo from "./Photo.jsx";

function Photos() {
  let photos = useSelector((state) => state.photos);
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

    let downloadPromises = photoObjs.map((obj) => {
      let photoRef = ref(storage, obj.path);
      tempPhotosState.push({ id: obj.id, path: obj.path });
      return getDownloadURL(photoRef);
    });

    Promise.all(downloadPromises)
      .then((results) => {
        let finalState = results.map((url, index) => ({
          ...tempPhotosState[index],
          url,
        }));
        dispatch(setPhotos(finalState));
      })
      .catch((error) => {
        console.error("Error retrieving photo URLs:", error);
      });
  }



  return (
    <div
      className="photos-container"
      style={{
        position: "relative",
        overflowY: "scroll",
      }}
    >
      <div className="photo-grid d-flex flex-row flex-wrap">
        {photos?.map((photo) => (
      
      <Photo key={photo.id} photo={photo} />
        ))}
      </div>
    </div>
  );
}

export default Photos;

import { useEffect } from "react";
import { db, storage } from "../firebase/firebase.config.js";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useDispatch, useSelector } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref, getMetadata } from "firebase/storage";
import { setPhotos } from "../Redux/photos.store.js";

import Timeline from "./Timeline.jsx";

function Photos() {
  let photos = useSelector((state) =>
    [...state.photos].sort((a, b) =>
      b?.timeCreated.localeCompare(a?.timeCreated)
    )
  )
    .map((photo) => {
      return { ...photo, timeCreated: new Date(photo.timeCreated) };
    })
    .reduce((acc,photo) => {
      let key = photo.timeCreated.getMonth() +'/'+ photo.timeCreated.getFullYear()
      if (acc[key])
        acc[key].push(photo);
      else acc[key] = [photo];
      return acc;
    }, {});

  let { currentUser } = useAuth();
  let dispatch = useDispatch();

  // console.log(photos);

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

    let downloadPromises = photoObjs.map(async (obj) => {
      let photoRef = ref(storage, obj.path);
      let { timeCreated } = await getMetadata(photoRef);
      tempPhotosState.push({ id: obj.id, path: obj.path, timeCreated });
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
      <div className="photo-grid">
        {
          Object.keys(photos).map((month, index)=><Timeline key={month+index} monthPhotos={photos[month]}/>)
        }
      </div>
    </div>
  );
}

export default Photos;

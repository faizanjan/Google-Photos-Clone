import { useEffect } from "react";
import { db, storage } from "../firebase/firebase.config.js";
import { Button } from "@mui/material";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useDispatch, useSelector } from "react-redux";

import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

import { getDownloadURL, ref, deleteObject } from "firebase/storage";

import { deletePhoto, setPhotos } from "../Redux/photos.store.js";

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

  const handleDelete = async (path, docId) => {
    try {
      let dltref = ref(storage, path);
      await deleteObject(dltref);
    } catch (error) {
      console.error(
        "Couldn't delete the referenced item from storage:",
        error.message
      );
    }
    let photoDoc = doc(db, `Users/${currentUser.uid}/Photos`, docId);
    try {
      await deleteDoc(photoDoc);
    } catch (error) {
      console.error(
        "Couldn't delete the document from collection:",
        error.message
      );
    }
    dispatch(deletePhoto(docId));
  };

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
          <div className="photo-container d-flex flex-column" key={photo.id}>
            <img
              src={photo.url}
              style={{ height: "200px", margin: "5px" }}
              alt="google photo"
            />
            <Button
              variant="outlined"
              onClick={() => handleDelete(photo.path, photo.id)}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Photos;

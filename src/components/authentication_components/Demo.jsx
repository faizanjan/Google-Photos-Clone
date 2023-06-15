import { useEffect, useState } from "react";
import { db, storage } from "../../firebase/firebase.config.js";
import { Button } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext.jsx";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";

function Home() {
  let [photos, setPhotos] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  let { currentUser, logOut } = useAuth();

  const usersCollection = collection(db, "Users");
  const photosCollection = collection(
    usersCollection,
    currentUser.uid,
    "Photos"
  );

  // const photosCollection = collection(db, "General Photos");

  useEffect(() => {
    getPhotoUrls();
  }, [selectedFiles]);

  async function getPhotoUrls() {
    let photoDocs = await getDocs(photosCollection);
    let photoObjs = photoDocs.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    let tempPhotosState = [];

    let downloadPromises = photoObjs.map((obj) => {
      let photoRef = ref(storage, obj.path);
      tempPhotosState.push({ id: obj.id, ref: photoRef });
      return getDownloadURL(photoRef);
    });

    Promise.all(downloadPromises)
      .then((results) => {
        let finalState = results.map((url, index) => ({
          ...tempPhotosState[index],
          url,
        }));
        setPhotos(finalState);
      })
      .catch((error) => {
        console.error("Error retrieving photo URLs:", error);
      });
  }

  const handleFileChange = (event) => {
    const files = event.target.files;
    setSelectedFiles(Object.values(files));
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (selectedFiles?.length !== 0) {
      (selectedFiles)?.forEach((selectedFile) => {
        const storageRef = ref(
          storage,
          `users/${currentUser.uid}/${selectedFile.name}`
        );
        uploadBytes(storageRef, selectedFile)
          .then((snapshot) => {
            addDoc(photosCollection, { path: snapshot.metadata.fullPath })
              .then(() => {
                setSelectedFiles((prevState)=>prevState.slice(1));
              })
              .catch((err) => {
                console.error(err.message);
              });
          })
          .catch((err) => {
            console.error(err.message);
          });
      })
    }
  };

  const handleDelete = async (ref, docId) => {
    try {
      await deleteObject(ref);
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
    setPhotos((prevPhotos) => {
      return prevPhotos.filter((photo) => photo.id !== docId);
    });
  };

  return (
    <>
      <h1>{currentUser.displayName}</h1>
      <form className="upload-photo">
        <input type="file" onChange={handleFileChange} multiple />
        <button onClick={handleUpload}>Upload</button>
      </form>

      <div className="photo-grid">
        {photos?.map((photo) => (
          <div className="photo-container" key={photo.id}>
            <img
              src={photo.url}
              style={{ height: "200px", margin: "5px" }}
              alt="google photo"
            />
            <Button
              variant="outlined"
              onClick={() => handleDelete(photo.ref, photo.id)}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>

      <Button variant="outlined" onClick={logOut}>
        LOG OUT
      </Button>
    </>
  );
}

export default Home;

import { useRef, useState, createContext } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.config.js";
import { Link, useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { setProfilePhotos } from "../../Redux/profilePhoto.store";
import { Box, TextField, Alert, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import SelectPhotos from "./SelectAlbumPhotos";

export let SelectionContext = createContext();

const CreateAlbum = ({ setShowForm }) => {
  const titleRef = useRef();
  const [showPhotoSelection, setShowPhotoSelection] = useState(false);
  let [selectedPhotos, setSelectedPhotos] = useState([]);

  let { currentUser } = useAuth();

  const handleNewAlbum = async (e) => {
    e.preventDefault();
    const usersCollection = collection(db, "Users");

    const albumsCollection = collection(
      usersCollection,
      currentUser.uid,
      "Albums"
    );
    let res = await addDoc(albumsCollection, {
      albumName: titleRef.current.value || "",
    });

    const thisAlbumCollection = collection(
      albumsCollection,
      res.id,
      `${titleRef.current.value} Photos`
    );

    let newPhotoDocs = selectedPhotos.map(async (photo) => {
      return await addDoc(thisAlbumCollection, photo);
    });

    console.log(newPhotoDocs);
  };

  return (
    <div
      className="create-album-form bg-light"
      style={{
        position: "fixed",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        height: "100vh",
      }}
    >
      <div className="create-album-toolbar py-3">
        <i
          className="fa-solid fa-arrow-left text-secondary fs-3 ms-4 hover-pointer"
          onClick={(e) => {
            setShowForm(false);
          }}
        ></i>
      </div>

      <form className="add-album-form d-flex flex-column align-items-center justify-content-center h-75 ">
        <input
          id="new-album-name"
          className="bg-light ps-5 mb-5"
          type="text"
          placeholder="Add a title"
          ref={titleRef}
        />

        <div className="album-form-btns d-flex flex-column my-5">
          <div
            id="select-album-photos-btn"
            className="border fs-5 text-dark fw-light my-2 opacity-50"
            disabled
          >
            <i className="fa-regular fa-face-smile pe-3 text-primary"></i>
            Select People &amp; Pets
          </div>

          <div
            id="select-album-photos-btn"
            className="border fs-5 text-dark fw-light my-2"
            onClick={() => setShowPhotoSelection(true)}
          >
            <i className="fa-solid fa-plus pe-3 text-primary"></i>
            Select Photos
          </div>
        </div>

        <SelectionContext.Provider value={setSelectedPhotos}>
          {showPhotoSelection && (
            <SelectPhotos
              setShowPhotoSelection={setShowPhotoSelection}
              handleNewAlbum={handleNewAlbum}
              setSelectedPhotos={setSelectedPhotos}
            />
          )}
        </SelectionContext.Provider>
      </form>
    </div>
  );
};

export default CreateAlbum;

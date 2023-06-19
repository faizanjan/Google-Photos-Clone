import { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { collection, setDoc, doc, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.config.js";
import { Link, useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { setProfilePhotos } from "../../Redux/profilePhoto.store";
import { Box, TextField, Alert, Button } from "@mui/material";
import { useDispatch } from "react-redux";



const CreateAlbum = ({ setShowForm }) => {
  const titleRef = useRef();
  // let selectedPhotos = [
  //     {
  //       id: "fZ58rs2VMqJMdljgqAyg",
  //       path: "users/PMeY3Vq4utUXlFcX7Vu0tKxr87s2/IMG_20221208_120705.jpg",
  //       timeCreated: "2023-06-19T08:58:45.082Z",
  //       url: "https://firebasestorage.googleapis.com/v0/b/photos-3aa17.appspot.com/o/users%2FPMeY3Vq4utUXlFcX7Vu0tKxr87s2%2FIMG_20221208_120705.jpg?alt=media&token=bc9bffcf-296d-4fee-b6c9-6ad43e9629ac",
  //       isFavourite: true,
  //       isArchived: false,
  //       isDeleted: false,
  //       index: 0,
  //     },
  //     {
  //       id: "gZjOzMkE4nJ3hKRMHwy4",
  //       path: "users/PMeY3Vq4utUXlFcX7Vu0tKxr87s2/IMG_20210702_091455.jpg",
  //       timeCreated: "2023-06-19T08:58:43.569Z",
  //       url: "https://firebasestorage.googleapis.com/v0/b/photos-3aa17.appspot.com/o/users%2FPMeY3Vq4utUXlFcX7Vu0tKxr87s2%2FIMG_20210702_091455.jpg?alt=media&token=e3c9808a-966b-443e-95f3-a2e0e42406d3",
  //       isFavourite: false,
  //       isArchived: false,
  //       isDeleted: false,
  //       index: 1,
  //     },
  //     {
  //       id: "og0zeFHriKNjwYlVYRs2",
  //       path: "users/PMeY3Vq4utUXlFcX7Vu0tKxr87s2/IMG_20210702_100640.jpg",
  //       timeCreated: "2023-06-19T08:57:40.868Z",
  //       url: "https://firebasestorage.googleapis.com/v0/b/photos-3aa17.appspot.com/o/users%2FPMeY3Vq4utUXlFcX7Vu0tKxr87s2%2FIMG_20210702_100640.jpg?alt=media&token=d7ad8df8-00e3-4a27-bf2b-47adef8ebf89",
  //       isFavourite: false,
  //       isArchived: false,
  //       isDeleted: false,
  //       index: 2,
  //     },
  //     {
  //       id: "eTkBUFqKiFJMdRQ1f9iX",
  //       path: "users/PMeY3Vq4utUXlFcX7Vu0tKxr87s2/SAVE_20211128_212234.jpg",
  //       timeCreated: "2023-06-17T09:27:48.600Z",
  //       url: "https://firebasestorage.googleapis.com/v0/b/photos-3aa17.appspot.com/o/users%2FPMeY3Vq4utUXlFcX7Vu0tKxr87s2%2FSAVE_20211128_212234.jpg?alt=media&token=ce079915-1b53-448e-a90c-20d88c558614",
  //       isFavourite: true,
  //       isArchived: false,
  //       isDeleted: false,
  //       index: 3,
  //     },
  //     {
  //       id: "2Y24uhAmZSJxfgEN0Srm",
  //       path: "users/PMeY3Vq4utUXlFcX7Vu0tKxr87s2/IMG_20230523_162325.jpg",
  //       timeCreated: "2023-06-16T06:59:46.245Z",
  //       url: "https://firebasestorage.googleapis.com/v0/b/photos-3aa17.appspot.com/o/users%2FPMeY3Vq4utUXlFcX7Vu0tKxr87s2%2FIMG_20230523_162325.jpg?alt=media&token=cfc2accc-d972-4bf9-b710-94a1b4950059",
  //       isFavourite: false,
  //       isArchived: false,
  //       isDeleted: false,
  //       index: 4,
  //     },
  //     {
  //       id: "nEJtCLvo3H6KDRp9phSy",
  //       path: "users/PMeY3Vq4utUXlFcX7Vu0tKxr87s2/IMG_20230515_110233.jpg",
  //       timeCreated: "2023-06-16T05:42:37.252Z",
  //       url: "https://firebasestorage.googleapis.com/v0/b/photos-3aa17.appspot.com/o/users%2FPMeY3Vq4utUXlFcX7Vu0tKxr87s2%2FIMG_20230515_110233.jpg?alt=media&token=07384145-d5ac-4e24-859c-7b134784565c",
  //       isFavourite: false,
  //       isArchived: false,
  //       isDeleted: false,
  //       index: 5,
  //     },
  //     {
  //       id: "64WK6t9ymDLCy1z5WjMa",
  //       path: "users/PMeY3Vq4utUXlFcX7Vu0tKxr87s2/SAVE_20211128_225908.jpg",
  //       timeCreated: "2023-06-15T13:52:35.464Z",
  //       url: "https://firebasestorage.googleapis.com/v0/b/photos-3aa17.appspot.com/o/users%2FPMeY3Vq4utUXlFcX7Vu0tKxr87s2%2FSAVE_20211128_225908.jpg?alt=media&token=0f8f5322-cbd3-449f-969d-504693863dbb",
  //       isFavourite: true,
  //       isArchived: false,
  //       isDeleted: false,
  //       index: 6,
  //     },
  // ];

  let {currentUser} = useAuth()

  const handleNewAlbum = async (e) => {
    e.preventDefault();
    const usersCollection = collection(db, "Users");

    const albumsCollection = collection(
      usersCollection,
      currentUser.uid,
      "Albums"
    );
    let res = await addDoc(albumsCollection, {
      albumName: titleRef.current.value,
    });

    const thisAlbumCollection = collection(
      albumsCollection,
      res.id,
      `${titleRef.current.value}_Photos`
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

      <form
        className="add-album-form d-flex flex-column align-items-center justify-content-center h-75 "
        onSubmit={(e)=>handleNewAlbum(e)}
      >
        <input
          id="new-album-name"
          className="bg-light ps-5 mb-5"
          type="text"
          placeholder="Add a title"
          ref={titleRef}
          required
        />

        <div className="album-form-btns d-flex flex-column my-5">
          <button
            id="select-album-photos-btn"
            className="border fs-5 text-dark fw-light my-2 opacity-50"
            disabled
          >
            <i className="fa-regular fa-face-smile pe-3 text-primary"></i>
            Select People &amp; Pets
          </button>

          <button
            id="select-album-photos-btn"
            className="border fs-5 text-dark fw-light my-2"
            type="submit"
          >
            <i className="fa-solid fa-plus pe-3 text-primary"></i>
            Select Photos
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAlbum;

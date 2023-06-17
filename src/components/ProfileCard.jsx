import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { collection, addDoc } from "firebase/firestore";
import { storage, db } from "../firebase/firebase.config.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addProfilePhoto } from "../Redux/profilePhoto.store";
import { useDispatch, useSelector } from "react-redux";

import Backdrop from "./secondary_components/Backdrop.jsx";

const ProfileCard = () => {
  let { currentUser, logOut } = useAuth();
  let profilePhoto = useSelector((state) => state.profilePhoto);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const dpRef = useRef();
  const dispatch = useDispatch();
  const usersCollection = collection(db, "Users");

  if (!currentUser) return <Backdrop />;

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedPhoto(URL.createObjectURL(file));

    const profilePhotosCollection = collection(
      usersCollection,
      currentUser.uid,
      "Profile Photos"
    );

    const storageRef = ref(
      storage,
      `users/${currentUser.uid}/profile-pictures/${file.name}`
    );
    let snapshot = await uploadBytes(storageRef, file);
    let path = snapshot.metadata.fullPath;
    let res = await addDoc(profilePhotosCollection, { path });
    let newPhotoRef = ref(storage, path);
    let url = await getDownloadURL(newPhotoRef);

    let newPhoto = {
      id: res.id,
      path,
      url,
      timeCreated: snapshot.metadata.timeCreated,
    };
    dispatch(addProfilePhoto(newPhoto));
  };

  return (
    <div
      className=" profile-container p-3 d-flex flex-column border shadow-lg rounded-5"
      style={{
        position: "fixed",
        right: "30px",
        top: "70px",
        minWidth: "400px",
        background: "#f3f6fc",
      }}
    >
      <div
        className="profile d-flex flex-row align-items-center p-4 border rounded-5 shadow"
        style={{ background: "white" }}
      >
        <input
          type="file"
          name="profile-picture"
          id="profile-picture"
          onChange={handleFileChange}
          className="d-none"
          ref={dpRef}
          required
        />
        <label htmlFor="profile-picture">
          <div
            className="mx-auto position-relative"
            id="dp"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            <img
              className="img-fluid"
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                cursor: "pointer",
              }}
              src={
                profilePhoto?.[0]?.url ||
                selectedPhoto ||
                "https://www.dgvaishnavcollege.edu.in/dgvaishnav-c/uploads/2021/01/dummy-profile-pic.jpg"
              }
              alt=""
            />
            <div
              style={{ position: "absolute", bottom: "10px", right: "10px" }}
            >
              <i
                className="fas fa-camera"
                style={{
                  color: "#fff",
                  backgroundColor: "#000",
                  borderRadius: "50%",
                  padding: "5px",
                }}
              ></i>
            </div>
          </div>
        </label>

        <div className="profile-detail d-flex flex-column align-items-start ms-4">
          <span className="name fs-5">{currentUser?.displayName}</span>
          <span className="email text-muted fw-light">
            {currentUser?.email}
          </span>
        </div>
      </div>
      <button
        className="btn btn-light btn-outline btn-signout signout d-flex flex-row justify-content-center align-items-center p-3 mt-4"
        onClick={logOut}
      >
        <i className="fa-solid fa-arrow-right-from-bracket me-3"></i>
        <span>Sign Out</span>
      </button>
    </div>
  );
};

export default ProfileCard;

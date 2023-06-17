import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { db, storage } from "../firebase/firebase.config.js";
import { addDoc, getDocs, collection } from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  getMetadata,
} from "firebase/storage";
import { useAuth } from "../contexts/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { addPhoto } from "../Redux/photos.store.js";
import { setProfilePhotos } from "../Redux/profilePhoto.store";

import Backdrop from "./secondary_components/Backdrop.jsx";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import ProfileCard from "./ProfileCard";

function NavBar() {
  const [showProfile, setShowProfile] = useState(false);
  const { currentUser } = useAuth();
  const profilePhoto = useSelector((state) => state.profilePhoto);
  const dispatch = useDispatch();
  const uploadRef = useRef();
  useEffect(() => {
    if (currentUser) getProfilePhoto();
  }, [currentUser]);

  if (!currentUser) return <Backdrop />;
  const usersCollection = collection(db, "Users");
  const photosCollection = collection(
    usersCollection,
    currentUser.uid,
    "Photos"
  );

  const profilePhotosCollection = collection(
    usersCollection,
    currentUser.uid,
    "Profile Photos"
  );

  async function getProfilePhoto() {
    let profilePhotoDocs = await getDocs(profilePhotosCollection);
    let profilePhotoObjs = profilePhotoDocs.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    let tempPhotosState = [];

    profilePhotoObjs.forEach(async (obj) => {
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
      dispatch(
        setProfilePhotos(
          tempPhotosState.map((photoObj, index) => ({ ...photoObj, index }))
        )
      );
    });
  }

  const handleFileChange = async (event) => {
    event.preventDefault();
    const files = event.target.files;
    let selectedFiles = Object.values(files);
    if (selectedFiles?.length !== 0) {
      selectedFiles?.forEach(async (selectedFile) => {
        try {
          const storageRef = ref(
            storage,
            `users/${currentUser.uid}/${selectedFile.name}`
          );
          let snapshot = await uploadBytes(storageRef, selectedFile);
          let path = snapshot.metadata.fullPath;
          let res = await addDoc(photosCollection, { path });
          let newPhotoRef = ref(storage, path);
          let url = await getDownloadURL(newPhotoRef);

          let newPhoto = {
            id: res.id,
            path,
            url,
            timeCreated: snapshot.metadata.timeCreated,
          };
          dispatch(addPhoto(newPhoto));
        } catch (error) {
          console.error(err.message);
        }
      });
    }
  };

  return (
    <>
      {showProfile && <ProfileCard />}
      <Navbar
        bg="white"
        expand="lg"
        className="border-bottom"
        style={{ height: "64px" }}
      >
        <Container fluid>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Navbar.Brand
              style={{ width: "250px" }}
              className="ms-2 d-flex flex-row align-items-center"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png"
                alt="logo"
                style={{ height: "22px" }}
                className="img img-fluid"
              />
              <h5 className="ms-1 mb-0 text-muted fw-normal">Photos</h5>
            </Navbar.Brand>
          </Link>

          <Navbar.Toggle aria-controls="navbarScroll" />

          <Navbar.Collapse
            className="d-flex flex-row justify-content-between  "
            id="navbarScroll"
          >
            <Form
              className="d-flex "
              style={{ width: "50%", maxWidth: "700px" }}
            >
              <Form.Control
                type="search"
                placeholder="   Search your photos"
                className="me-2 py-2"
                aria-label="Search"
                style={{
                  border: "none",
                  background: "rgb(241,243,244)",
                  height: "50px",
                }}
              />
            </Form>

            <Nav
              className="my-2 my-lg-0 me-3 w-25 d-flex fs-6 flex-row text-secondary justify-content-between align-items-center"
              style={{ maxHeight: "100px", maxWidth: "250px" }}
              navbarScroll
            >
              <input
                id="upload-file"
                type="file"
                multiple
                style={{ display: "none" }}
                onChange={handleFileChange}
                ref={uploadRef}
              />
              <label
                htmlFor="upload-file"
                className="upload hover-pointer d-flex flex-row align-items-center"
              >
                <i className="fa-solid fa-upload me-2"></i>
                Upload
              </label>

              <i className="fa-regular fa-circle-question hover-pointer"></i>

              <i className="fa-solid fa-gear hover-pointer"></i>

              <div
                className="profile hover-pointer"
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
                onClick={() => {
                  setShowProfile(!showProfile);
                }}
              >
                <img
                  src={
                    profilePhoto?.[0]?.url ||
                    "https://www.dgvaishnavcollege.edu.in/dgvaishnav-c/uploads/2021/01/dummy-profile-pic.jpg"
                  }
                  alt="profile"
                  className="profile-link-img img-fluid rounded-5"
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                    cursor: "pointer",
                  }}
                />
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;

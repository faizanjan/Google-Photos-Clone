import { useContext, useEffect, useState } from "react";
import { CarouselContext } from "./Home.jsx";
import { useSelector } from "react-redux";
import { db, storage } from "../firebase/firebase.config.js";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { useAuth } from "../contexts/AuthContext.jsx";
import { deletePhoto, addPhoto, toggleFav } from "../Redux/photos.store.js";
import {
  addPhotoToTrash,
  removePhotoFromTrash,
} from "../Redux/trashPhotos.store.js";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getStateKey } from "../modules/processPhotos.js";
import { addPhotoToFav, removePhotoFromFav } from "../Redux/favPhotos.store.js";
import { sharePhotos } from "../modules/sharePhotos.js";

import ToolTip from "./secondary_components/ToolTip.jsx";
import MoreInfo from "./secondary_components/MoreInfo.jsx";
import SharingModal from "./sharingComponents/SharingModal.jsx";
import AddToAlbumModal from "./albumComponents/AddToAlbumModal.jsx";
import CustomizedSnackbars from "./secondary_components/Snackbar.jsx";

const CarouselToolbar = ({ photoIndex, setActiveIndex, lastIndex }) => {
  let { pathname } = useLocation();
  let { setShowCarousel } = useContext(CarouselContext);
  let { currentUser } = useAuth();
  let [showAddToAlbum, setShowAddToAlbum] = useState(false);
  let [showSharing, setShowSharing] = useState(false);
  let [snackbar, setSnackbar] = useState({});
  let [showSnackbar, setShowSnackbar] = useState(false);

  let key = getStateKey(pathname);
  let photo = useSelector((state) => state[key][photoIndex]);
  let dispatch = useDispatch();
  const [isFav, setIsFav] = useState(Boolean(photo?.isFavourite));

  useEffect(() => {
    if (photo) setIsFav(Boolean(photo.isFavourite));
  }, [photo]);

  if (!photo) return;

  const handleSharing = (receipientId, receipientEmail) => {
    if (!receipientId) {
      setSnackbar({ severity: "error", message: "User does not exist" });
    }
    else{
      setSnackbar({ severity: "success", message: "Photo Sent" });
      sharePhotos(receipientId, receipientEmail, currentUser, [photo]);
    }
    setShowSnackbar(true);
  };

  const handleDelete = async (event, path, docId) => {
    event.stopPropagation();
    try {
      let photoDoc = doc(db, `Users/${currentUser.uid}/Photos`, docId);
      let dltref = ref(storage, path);
      await deleteObject(dltref);
      await deleteDoc(photoDoc);
      if (photoIndex === lastIndex) setActiveIndex(0);
      dispatch(removePhotoFromTrash(docId));
    } catch (error) {
      console.error("Couldn't delete the referenced item:", error.message);
    }
  };

  const addToTrash = async (e, docId) => {
    e.stopPropagation();
    const photoDocRef = doc(db, `Users/${currentUser.uid}/Photos`, docId);
    try {
      await updateDoc(photoDocRef, { isDeleted: true });
      if (photoIndex === lastIndex) setActiveIndex(0);
      dispatch(deletePhoto(docId));
      dispatch(addPhotoToTrash(photo));
    } catch (error) {
      console.error(
        "Couldn't update the document in the collection:",
        error.message
      );
    }
  };

  const handleRestore = async (e, docId) => {
    if (!docId) return;
    e.stopPropagation();
    const photoDocRef = doc(db, `Users/${currentUser.uid}/Photos`, docId);
    try {
      await updateDoc(photoDocRef, { isDeleted: false });
      dispatch(removePhotoFromTrash(docId));
      dispatch(addPhoto(photo));
      if (photoIndex === lastIndex) setActiveIndex(0);
    } catch (error) {
      console.error(
        "Couldn't update the document in the collection:",
        error.message
      );
    }
  };

  const toggleFavourite = async (docId) => {
    const photoDocRef = doc(db, `Users/${currentUser.uid}/Photos`, docId);
    try {
      await updateDoc(photoDocRef, { isFavourite: !photo.isFavourite });
      dispatch(toggleFav(docId));
      dispatch(
        photo.isFavourite ? removePhotoFromFav(docId) : addPhotoToFav(photo)
      );
    } catch (error) {
      console.error(
        "Couldn't update the document in the collection:",
        error.message
      );
    }
  };

  return (
    <>
      <div className="carousel-toolbar bg-dark py-4 d-flex flex-row justify-content-between align-items-center">
        <i
          className="fa-solid fa-arrow-left text-light fs-3 ms-4 hover-pointer"
          onClick={(e) => {
            setShowCarousel(false);
          }}
        ></i>
        <div className="carousel-tools me-5">
          <ToolTip tooltip="Share">
            <i
              style={pathname === "/home/bin" ? { display: "none" } : {}}
              className="mx-3 hover-pointer text-light fa-solid fa-share-nodes"
              onClick={() => setShowSharing(true)}
            ></i>
          </ToolTip>

          <ToolTip tooltip="Edit">
            <i
              style={pathname === "/home/bin" ? { display: "none" } : {}}
              className="mx-3 hover-pointer text-light fa-solid fa-sliders"
            ></i>
          </ToolTip>

          <span
            style={pathname !== "/home/bin" ? { display: "none" } : {}}
            className="delete-from-bin text-light mx-3 hover-pointer "
            onClick={(e) => handleDelete(e, photo.path, photo.id)}
          >
            <i className="mx-3 text-light fa-solid fa-trash"></i>
            Delete
          </span>

          <span
            style={pathname !== "/home/bin" ? { display: "none" } : {}}
            className="delete-from-bin text-light mx-3 hover-pointer "
            onClick={(e) => {
              handleRestore(e, photo.id);
            }}
          >
            <i className="mx-3 fa-solid fa-clock-rotate-left"></i>
            Restore
          </span>

          <ToolTip tooltip="Zoom">
            <i className="mx-3 hover-pointer text-light fa-solid fa-magnifying-glass-plus"></i>
          </ToolTip>
          <ToolTip tooltip="Info">
            <i className="mx-3 hover-pointer text-light fa-solid fa-circle-info"></i>
          </ToolTip>
          <ToolTip tooltip="Favourite">
            <i
              style={pathname === "/home/bin" ? { display: "none" } : {}}
              className={
                "mx-3 hover-pointer text-light fa-star" +
                (isFav ? " fa-solid" : " fa-regular")
              }
              onClick={() => {
                toggleFavourite(photo.id, photo.isFavourite);
              }}
            ></i>
          </ToolTip>
          <ToolTip tooltip="Delete">
            <i
              style={pathname === "/home/bin" ? { display: "none" } : {}}
              className="mx-3 hover-pointer text-light fa-solid fa-trash-can"
              onClick={(e) => {
                addToTrash(e, photo.id);
              }}
            ></i>
          </ToolTip>
          {pathname !== "/home/bin" && (
            <MoreInfo
              photo={photo}
              currentUser={currentUser}
              setShowAddToAlbum={setShowAddToAlbum}
            />
          )}
        </div>

        <SharingModal
          show={showSharing}
          onHide={() => setShowSharing(false)}
          sharePhotoWith={handleSharing}
        />

        <AddToAlbumModal
          show={showAddToAlbum}
          onHide={() => setShowAddToAlbum(false)}
          photo={photo}
        />
      </div>
      <CustomizedSnackbars
        severity={snackbar.severity}
        message={snackbar.message}
        open={showSnackbar}
        setOpen={setShowSnackbar}
      />
    </>
  );
};

export default CarouselToolbar;

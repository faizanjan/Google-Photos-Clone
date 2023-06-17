import { useContext, useEffect, useState } from "react";
import { CarouselContext } from "./Home.jsx";
import { useSelector } from "react-redux";
import { db, storage } from "../firebase/firebase.config.js";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { useAuth } from "../contexts/AuthContext.jsx";
import { deletePhoto, moveToBin, toggleFav } from "../Redux/photos.store.js";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import ToolTip from "./secondary_components/ToolTip.jsx";

const CarouselToolbar = ({ photoIndex }) => {
  let { pathname } = useLocation();
  let { setShowCarousel } = useContext(CarouselContext);
  let { currentUser } = useAuth();
  let photo = useSelector((state) => state.photos[photoIndex]);
  const [isFav, setIsFav] = useState(Boolean(photo.isFavourite));
  let dispatch = useDispatch();

  useEffect(() => {
    setIsFav(Boolean(photo.isFavourite));
  }, [photo]);

  const handleDelete = async (event, path, docId) => {
    event.stopPropagation();
    try {
      let photoDoc = doc(db, `Users/${currentUser.uid}/Photos`, docId);
      let dltref = ref(storage, path);
      await deleteObject(dltref);
      await deleteDoc(photoDoc);
      dispatch(deletePhoto(docId));
    } catch (error) {
      console.error("Couldn't delete the referenced item:", error.message);
    }
  };

  const toggleTrash = async (e,docId) => {
    e.stopPropagation();
    const photoDocRef = doc(db, `Users/${currentUser.uid}/Photos`, docId);
    try {
      await updateDoc(photoDocRef, { isDeleted: !photo.isDeleted });
      dispatch(moveToBin(docId));
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
    } catch (error) {
      console.error(
        "Couldn't update the document in the collection:",
        error.message
      );
    }
  };

  return (
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
          onClick={(e)=>handleDelete(e, photo.path, photo.id)}
        >
          <i className="mx-3 text-light fa-solid fa-trash"></i>
          Delete
        </span>

        <span
          style={pathname !== "/home/bin" ? { display: "none" } : {}}
          className="delete-from-bin text-light mx-3 hover-pointer "
          onClick={(e) => {
            toggleTrash(e, photo.id);
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
              toggleFavourite(photo.id);
            }}
          ></i>
        </ToolTip>
        <ToolTip tooltip="Delete">
          <i
            style={pathname === "/home/bin" ? { display: "none" } : {}}
            className="mx-3 hover-pointer text-light fa-solid fa-trash-can"
            onClick={(e) => {
              toggleTrash(e, photo.id);
            }}
          ></i>
        </ToolTip>
        <ToolTip tooltip="More Options">
          <i
            style={pathname === "/home/bin" ? { display: "none" } : {}}
            className="mx-3 hover-pointer text-light fa-solid fa-ellipsis-vertical"
          ></i>
        </ToolTip>
      </div>
    </div>
  );
};

export default CarouselToolbar;

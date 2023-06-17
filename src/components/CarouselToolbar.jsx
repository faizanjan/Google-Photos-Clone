import { useContext } from "react";
import { CarouselContext } from "./Photos.jsx";
import { useSelector } from "react-redux";
import { db, storage } from "../firebase/firebase.config.js";
import { deleteDoc, doc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { useAuth } from "../contexts/AuthContext.jsx";
import { deletePhoto } from "../Redux/photos.store.js";
import { useDispatch } from "react-redux";

import ToolTip from "./secondary_components/ToolTip.jsx";

const CarouselToolbar = ({ photoIndex }) => {
  let { setShowCarousel } = useContext(CarouselContext);
  let photo = useSelector((state) => state.photos[photoIndex]);
  let { currentUser } = useAuth();
  let dispatch = useDispatch();

  const handleDelete = async (event, path, docId) => {
    event.stopPropagation();
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
    <div className="carousel-toolbar bg-dark py-4 d-flex flex-row justify-content-between align-items-center">
      <i
        className="fa-solid fa-arrow-left text-light fs-3 ms-4 hover-pointer"
        onClick={(e) => {
          setShowCarousel(false);
        }}
      ></i>
      <div className="carousel-tools me-5">
        <ToolTip tooltip="Share">
          <i className="mx-3 hover-pointer text-light fa-solid fa-share-nodes"></i>
        </ToolTip>

        <ToolTip tooltip="Edit">
          <i className="mx-3 hover-pointer text-light fa-solid fa-sliders"></i>
        </ToolTip>

        <ToolTip tooltip="Zoom">
          <i className="mx-3 hover-pointer text-light fa-solid fa-magnifying-glass-plus"></i>
        </ToolTip>
        <ToolTip tooltip="Info">
          <i className="mx-3 hover-pointer text-light fa-solid fa-circle-info"></i>
        </ToolTip>
        <ToolTip tooltip="Favourite">
          <i className="mx-3 hover-pointer text-light fa-regular fa-star"></i>
        </ToolTip>
        <ToolTip tooltip="Delete">
          <i
            className="mx-3 hover-pointer text-light fa-solid fa-trash-can"
            onClick={(e) => handleDelete(e, photo.path, photo.id)}
          ></i>
        </ToolTip>
        <ToolTip tooltip="More Options">
          <i className="mx-3 hover-pointer text-light fa-solid fa-ellipsis-vertical"></i>
        </ToolTip>
      </div>
    </div>
  );
};

export default CarouselToolbar;

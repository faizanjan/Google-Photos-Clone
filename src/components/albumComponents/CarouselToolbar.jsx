import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase.config.js";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { deletePhoto, toggleFav } from "../../Redux/photos.store.js";
import { addPhotoToTrash } from "../../Redux/trashPhotos.store.js";
import { useDispatch, useSelector } from "react-redux";
import {
  addPhotoToFav,
  removePhotoFromFav,
} from "../../Redux/favPhotos.store.js";
import { deletePhotoFromAlbum } from "../../Redux/albums.store.js";
import ToolTip from "./../secondary_components/ToolTip.jsx";

const CarouselToolbar = ({
  photoId,
  idInAlbum,
  activeIndex,
  setActiveIndex,
  lastIndex,
  setShowCarousel,
  albumId,
}) => {
  let photo = useSelector((state) =>
    state.photos.find((photo) => photo.id === photoId)
  );

  let { currentUser } = useAuth();

  let dispatch = useDispatch();
  const [isFav, setIsFav] = useState(Boolean(photo?.isFavourite));
  useEffect(() => {
    if (photo) setIsFav(Boolean(photo.isFavourite));
  }, [photo]);

  if (!photo) return;

  const addToTrash = async (e, docId) => {
    e.stopPropagation();
    const photoDocRef = doc(db, `Users/${currentUser.uid}/Photos`, docId);
    try {
      await updateDoc(photoDocRef, { isDeleted: true });
      if (photo.index === lastIndex) setActiveIndex(0);
      removeFromAlbum(idInAlbum);
      dispatch(deletePhoto(docId));
      dispatch(addPhotoToTrash(photo));
    } catch (error) {
      console.error(
        "Couldn't update the document in the collection:",
        error.message
      );
    }
  };

  const removeFromAlbum = async (docId) => {
    try {
      let albumPhotoDoc = doc(
        db,
        `Users/${currentUser.uid}/Albums/${albumId}/Album Photos`,
        docId
      );
      await deleteDoc(albumPhotoDoc);
      if (activeIndex === lastIndex) setActiveIndex(0);

      dispatch(deletePhotoFromAlbum({ albumId, photoId: docId }));
    } catch (error) {
      console.error("Couldn't delete the referenced item:", error.message);
    }
  };

  const toggleFavourite = async () => {
    let docId = photo.id;
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
          <i
            className={
              "mx-3 hover-pointer text-light fa-star" +
              (isFav ? " fa-solid" : " fa-regular")
            }
            onClick={() => {
              toggleFavourite();
            }}
          ></i>
        </ToolTip>
        <ToolTip tooltip="Delete">
          <i
            className="mx-3 hover-pointer text-light fa-solid fa-trash-can"
            onClick={(e) => {
              addToTrash(e, photo.id);
            }}
          ></i>
        </ToolTip>
        <ToolTip tooltip="Remove from Album">
          <i
            className="mx-3 hover-pointer text-light fa-solid fa-folder-minus"
            onClick={(e) => {
              removeFromAlbum(idInAlbum);
            }}
          ></i>
        </ToolTip>
      </div>
    </div>
  );
};

export default CarouselToolbar;

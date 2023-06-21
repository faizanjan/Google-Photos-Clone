import { useSelector, useDispatch } from "react-redux";
import { db } from "../../firebase/firebase.config.js";
import { deleteDoc, doc } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { deleteSharedPhoto } from "../../Redux/sharedPhotos.store.js";

import ToolTip from "./../secondary_components/ToolTip.jsx";

const CarouselToolbar = ({
  photoId,
  setShowCarousel,
  showSent,
  activeIndex,
  setActiveIndex,
  lastIndex,
}) => {
  let photo = useSelector((state) => {
    return showSent
      ? state.shared.sentPhotos.find((photo) => photo.id === photoId)
      : state.shared.receivedPhotos.find((photo) => photo.id === photoId);
  });

  let { currentUser } = useAuth();
  let dispatch = useDispatch();

  if (!photo) return;

  const handleDownload = () => {
    fetch(photo.url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "";
        link.click();
        URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error downloading the photo:", error);
      });
  };

  const handleDelete = async (docId) => {
    try {
      let albumPhotoDoc = doc(
        db,
        `Users/${currentUser.uid}/Shared Photos/${currentUser.uid}/` +
          (showSent ? "Sent" : "Received"),
        docId
      );
      await deleteDoc(albumPhotoDoc);
      if (activeIndex === lastIndex) setActiveIndex(0);

      dispatch(deleteSharedPhoto({ wasPhotoSent: showSent, photoId: docId }));
    } catch (error) {
      console.error("Couldn't delete the referenced item:", error.message);
    }
  };

  return (
    <div
      className="carousel-toolbar bg-dark py-4 d-flex flex-row justify-content-between align-items-center"
      style={{ position: "relative" }}
    >
      <i
        className="fa-solid fa-arrow-left text-light fs-3 ms-4 hover-pointer"
        onClick={(e) => {
          setShowCarousel(false);
        }}
      ></i>

      <h4
        className="text-light fw-light text-center"
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        {showSent ? "To: " + photo.to : "From: " + photo.from}
      </h4>
      <div className="carousel-tools me-5">
        <ToolTip tooltip="Edit">
          <i className="mx-3 hover-pointer text-light fa-solid fa-sliders fs-5"></i>
        </ToolTip>

        <ToolTip tooltip="Zoom">
          <i className="mx-3 hover-pointer text-light fa-solid fa-magnifying-glass-plus fs-5"></i>
        </ToolTip>
        <ToolTip tooltip="Info">
          <i className="mx-3 hover-pointer text-light fa-solid fa-circle-info fs-5"></i>
        </ToolTip>

        <ToolTip tooltip="Delete">
          <i
            className="mx-3 hover-pointer text-light fa-solid fa-trash-can fs-5"
            onClick={(e) => {
              handleDelete(photo.id);
            }}
          ></i>
        </ToolTip>
        <ToolTip tooltip="Download">
          <i
            className="mx-3 hover-pointer text-light fa-solid fa-download fs-5"
            onClick={handleDownload}
          ></i>
        </ToolTip>
      </div>
    </div>
  );
};

export default CarouselToolbar;

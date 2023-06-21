import { useSelector } from "react-redux";
import ToolTip from "./../secondary_components/ToolTip.jsx";

const CarouselToolbar = ({ photoId, setShowCarousel, showSent }) => {
  let photo = useSelector((state) => {
    return showSent
      ? state.shared.sentPhotos.find((photo) => photo.id === photoId)
      : state.shared.receivedPhotos.find((photo) => photo.id === photoId);
  });

  if (!photo) return;

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
            left:'50%',
            transform: "translateX(-50%)"
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
              console.log("deleting...");
            }}
          ></i>
        </ToolTip>
        <ToolTip tooltip="Download">
          <i
            className="mx-3 hover-pointer text-light fa-solid fa-download fs-5"
            onClick={(e) => {
              console.log("downloading...");
            }}
          ></i>
        </ToolTip>
      </div>
    </div>
  );
};

export default CarouselToolbar;

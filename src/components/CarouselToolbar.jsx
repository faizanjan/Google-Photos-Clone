import { useContext } from "react";
import { CarouselContext } from "./Photos.jsx";

import ToolTip from "./secondary_components/ToolTip.jsx";

const CarouselToolbar = () => {
  let { setShowCarousel } = useContext(CarouselContext);

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
          <i className="mx-3 hover-pointer text-light fa-solid fa-trash-can"></i>
        </ToolTip>
        <ToolTip tooltip="More Options">
          <i className="mx-3 hover-pointer text-light fa-solid fa-ellipsis-vertical"></i>
        </ToolTip>
      </div>
    </div>
  );
};

export default CarouselToolbar;

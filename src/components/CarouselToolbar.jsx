import { useContext } from "react";
import { CarouselContext } from "./Photos.jsx";

const CarouselToolbar = () => {
  let {setShowCarousel} = useContext(CarouselContext);

  return (
    <div className="carousel-toolbar bg-dark py-4 d-flex flex-row justify-content-between align-items-center">
      <i
        className="fa-solid fa-arrow-left text-light fs-3 ms-4 hover-pointer"
        onClick={(e) => {
          setShowCarousel(false);
        }}
      ></i>
      <div className="carousel-tools me-5">
        <i className="mx-3 hover-pointer text-light fa-solid fa-share-nodes"></i>
        <i className="mx-3 hover-pointer text-light fa-solid fa-sliders"></i>
        <i className="mx-3 hover-pointer text-light fa-solid fa-magnifying-glass-plus"></i>
        <i className="mx-3 hover-pointer text-light fa-solid fa-circle-info"></i>
        <i className="mx-3 hover-pointer text-light fa-regular fa-star"></i>
        <i className="mx-3 hover-pointer text-light fa-solid fa-trash-can"></i>
        <i className="mx-3 hover-pointer text-light fa-solid fa-ellipsis-vertical"></i>
      </div>
    </div>
  );
};

export default CarouselToolbar;

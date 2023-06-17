import { useContext } from "react";
import { CarouselContext } from "./Home.jsx";
import { useLocation } from "react-router-dom";
import { showPhoto } from "../modules/processPhotos.js";

const Photo = ({ photo }) => {
  let { pathname } = useLocation();

  let { setShowCarousel, setActiveIndex } = useContext(CarouselContext);

  if (showPhoto(pathname, photo))
    return (
      <div
        className="photo-container d-flex flex-column position-relative"
        style={{ margin: "20px 5px" }}
        onClick={() => {
          setShowCarousel(true);
          setActiveIndex(photo.index);
        }}
      >
        <img
          src={photo.url}
          style={
            pathname === "/home/bin" ? { height: "180px" } : { height: "250px" }
          }
          alt="google photo"
        />
      </div>
    );
};

export default Photo;

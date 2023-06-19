import { useContext } from "react";
import { CarouselContext } from "./Home.jsx";
import { useLocation } from "react-router-dom";

const Photo = ({ photo }) => {
  let { pathname } = useLocation();

  let { setShowCarousel, setActiveIndex } = useContext(CarouselContext);

    return (
      <div
        className="photo-container d-flex flex-column position-relative mx-1"
        style={{ margin: "20px 0" }}
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

import { useContext} from "react";
import { CarouselContext } from "./Photos.jsx";

const Photo = ({ photo }) => {

  let {setShowCarousel, setActiveIndex} = useContext(CarouselContext);


  return (
    <div
      className="photo-container d-flex flex-column position-relative"
      style={{ margin: "20px 5px" }}
      onClick={() => {
        setShowCarousel(true);
        setActiveIndex(photo.index)
      }}
    >
      <img src={photo.url} style={{ height: "250px" }} alt="google photo" />
    </div>
  );
};

export default Photo;

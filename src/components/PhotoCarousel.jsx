import { useRef, useEffect } from "react";

import Carousel from "react-bootstrap/Carousel";
import CarouselToolbar from "./CarouselToolbar";

function PhotoCarousel({
  photos,
  activeIndex,
  setActiveIndex,
  setShowCarousel,
}) {
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.focus();
  }, []);

  let carouselPhotos = Object.values(photos)
    .map((monthPhotos) => monthPhotos.map((photo) => photo))
    .flat();

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  const handleKeyPress = (e) => {
    switch (e.key) {
      case "ArrowRight":
        if (activeIndex !== carouselPhotos.length - 1)
          setActiveIndex(activeIndex + 1);
        break;
      case "ArrowLeft":
        if (activeIndex !== 0) setActiveIndex(activeIndex - 1);
        break;
      case "Escape":
        setShowCarousel(false);
        break;
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
      tabIndex={0}
      onKeyDown={handleKeyPress}
      ref={divRef}
    >
      <CarouselToolbar
        photoIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        lastIndex={carouselPhotos.length - 1}
      />

      <Carousel
        activeIndex={activeIndex}
        onSelect={handleSelect}
        className="bg-dark"
      >
        {carouselPhotos.map((photo) => {
          return (
            <Carousel.Item key={photo.id}>
              <img
                className="d-block w-100"
                src={photo.url}
                alt={photo.id}
                style={{
                  height: "calc(100vh - 75px)",
                  width: "auto",
                  objectFit: "contain",
                }}
              />
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
}

export default PhotoCarousel;

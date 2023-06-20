import { useRef, useEffect } from "react";

import Carousel from "react-bootstrap/Carousel";
import CarouselToolbar from "./CarouselToolbar";

function AlbumCarousel({
  photos,
  activeIndex,
  albumId,
  setActiveIndex,
  setShowCarousel,
}) {
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.focus();
  }, []);

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  const handleKeyPress = (e) => {
    switch (e.key) {
      case "ArrowRight":
        if (activeIndex !== photos.length - 1) setActiveIndex(activeIndex + 1);
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
        zIndex: 50,
      }}
      tabIndex={0}
      onKeyDown={handleKeyPress}
      ref={divRef}
    >
      <CarouselToolbar
        photoId={photos[activeIndex].photoId}
        idInAlbum={photos[activeIndex].idInAlbum}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        lastIndex={photos.length - 1}
        setShowCarousel={setShowCarousel}
        albumId={albumId}
      />

      <Carousel
        activeIndex={activeIndex}
        onSelect={handleSelect}
        className="bg-dark"
      >
        {photos.map((photo) => {
          return (
            <Carousel.Item key={photo.photoId}>
              <img
                className="d-block w-100"
                src={photo.url}
                alt={photo.photoId}
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

export default AlbumCarousel;

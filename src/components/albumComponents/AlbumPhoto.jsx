import React from "react";

const AlbumPhoto = ({ photo, photoIndex, setShowCarousel, setActiveIndex }) => {
  return (
    <div
      className="photo-container position-relative mx-1"
      style={{ margin: "20px 0" }}
      onClick={() => {
        setShowCarousel(true);
        setActiveIndex(photoIndex);
      }}
    >
      <img
        className="rounded-3"
        src={photo.url}
        style={{ height: "250px" }}
        alt="google photo"
      />
    </div>
  );
};

export default AlbumPhoto;

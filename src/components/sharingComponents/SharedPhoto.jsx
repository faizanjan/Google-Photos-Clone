import React from "react";

const SharedPhoto = ({ photo, index, showSent, showCarousel, setActiveIndex }) => {
  return (
    <div
      className="photo-container d-flex flex-column position-relative mx-2 border shadow rounded"
      style={{ margin: "20px 0" }}
      onClick={()=>{
        showCarousel()
        setActiveIndex(index)
      }}
    >
      <img src={photo.url} style={{ height: "250px" }} alt="google photo" />
      <span className="text-muted p-1 ms-2">
        {showSent ? "To: " + photo.to : "From: " + photo.from}
      </span>
    </div>
  );
};

export default SharedPhoto;

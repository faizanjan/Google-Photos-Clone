import { useState } from "react";

const SharedPhoto = ({
  photo,
  index,
  showSent,
  showCarousel,
  setActiveIndex,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <div
      className={
        "d-flex flex-column position-relative m-2 mb-3 rounded-3" +
        (showDetails ? " shadow " : "")
      }
      style={{ margin: "20px 0", transition: 'all 0.5s' }}
      onClick={() => {
        showCarousel();
        setActiveIndex(index);
      }}
      onMouseOver={() => setShowDetails(true)}
      onMouseOut={() => setShowDetails(false)}
    >
      <img src={photo.url} style={{ height: "250px" }} alt="google photo" />

      <span
        className="text-secondary p-2 ms-2"
        style={{
          position: "relative",
          top: showDetails ? "0" : "-50px",
          opacity: showDetails ? "1" : 0,
          transition: 'all 0.3s'
        }}
      >
        {showSent ? "To: " + photo.to : "From: " + photo.from}
      </span>
    </div>
  );
};

export default SharedPhoto;

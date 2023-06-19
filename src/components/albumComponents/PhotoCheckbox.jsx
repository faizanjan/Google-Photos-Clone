import React, { useContext, useRef } from "react";
import { SelectionContext } from "./CreateAlbum";

const PhotoCheckbox = ({ photo }) => {
  let photoRef = useRef();
  let setSelectedPhotos = useContext(SelectionContext);
  const addOrRemoveFromSelectedPhotos = () => {
    if (photoRef.current.checked) {
      setSelectedPhotos((prevState) => [...prevState, photo]);
    } else {
      setSelectedPhotos((prevState) =>
        prevState.filter((selectedPhoto) => selectedPhoto.id !== photo.id)
      );
    }
  };

  return (
    <div className="photo-checkbox mx-1">
      <label
        htmlFor={photo.id}
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), transparent), url(${photo.url})`,
        }}
      >
        <input
          type="checkbox"
          name=""
          id={photo.id}
          onChange={addOrRemoveFromSelectedPhotos}
          ref={photoRef}
        />
        <img
          src={photo.url}
          alt=""
          className="img-fluid"
          style={{ height: "100%", opacity: 0 }}
        />
      </label>
    </div>
  );
};

export default PhotoCheckbox;
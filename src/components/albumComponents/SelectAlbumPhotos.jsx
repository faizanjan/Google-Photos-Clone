import DayGridForSelection from "./DayGrid_withSelection";
import getDayMonthYear from "../../modules/calendar.js";
import { createPhotosArr } from "../../modules/processPhotos.js";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function SelectPhotos({
  setShowPhotoSelection,
  handleNewAlbum,
  setSelectedPhotos,
}) {
  let photos_from_redux = useSelector((state) => state);
  let monthPhotosObj = createPhotosArr(photos_from_redux.photos);
  let monthPhotos = Object.values(monthPhotosObj).flat();
  let photos = monthPhotos.reduce((acc, photo) => {
    let key =
      getDayMonthYear(photo.timeCreated).monthName +
      "/" +
      getDayMonthYear(photo.timeCreated).year +
      "/" +
      getDayMonthYear(photo.timeCreated).dayOfMonth;
    if (acc[key]) acc[key].push(photo);
    else acc[key] = [photo];
    return acc;
  }, {});

  useEffect(() => {
    setSelectedPhotos([]);
  }, []);
  return (
    <div
      className="photos-selection ms-2 bg-light"
      style={{
        overflowY: "scroll",
        position: "fixed",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        height: "100vh",
        zIndex: 10,
      }}
    >
      <div className="create-album-toolbar py-3 d-flex flex-row justify-content-between">
        <i
          className="fa-solid fa-multiply text-secondary fs-3 ms-4 hover-pointer"
          onClick={(e) => {
            setShowPhotoSelection(false);
          }}
        ></i>
        <button
          className="btn btn-primary me-4"
          onClick={() => {
            handleNewAlbum();
            setShowPhotoSelection(false);
          }}
        >
          Done
        </button>
      </div>

      <div className="day-grid">
        {Object.keys(photos).map((date) => (
          <DayGridForSelection key={date} photos={photos[date]} />
        ))}
      </div>
    </div>
  );
}

export default SelectPhotos;

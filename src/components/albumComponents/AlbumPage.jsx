import { useState, createContext } from "react";
import { useSelector } from "react-redux";
import { db } from "../../firebase/firebase.config.js";
import { doc, updateDoc } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { useDispatch } from "react-redux";
import { addPhotosToAlbum, updateAlbumName } from "../../Redux/albums.store";
import { addPhotosToAlbum as addNewPhotos } from "../../modules/addPhotosToAlbum.js";
import AlbumPhoto from "./AlbumPhoto";
import AlbumCarousel from "./AlbumCarousel.jsx";
import ToolTip from "../secondary_components/ToolTip.jsx";
import SelectPhotos from "./SelectAlbumPhotos.jsx";
import CustomizedSnackbars from "../secondary_components/Snackbar.jsx";

export let AddPhotosToAlbum = createContext();

const AlbumPage = ({ propAlbum, setShowAlbumPage, handleDeleteAlbum, isAlbumReceived }) => {
  // let album = useSelector((state) => state.albums[albumId]);
  const album = isAlbumReceived
    ? propAlbum
    : useSelector((state) => state.albums[propAlbum?.albumId]);

  let [albumName, setAlbumName] = useState(album.albumName);
  let [showPhotoSelection, setShowPhotoSelection] = useState(false);
  let [newPhotos, setNewPhotos] = useState([]);
  let [showCarousel, setShowCarousel] = useState(false);
  let [activeIndex, setActiveIndex] = useState(0);
  let [snackbar, setSnackbar] = useState({});
  let [showSnackbar, setShowSnackbar] = useState(false);

  let { currentUser } = useAuth();
  let dispatch = useDispatch();

  const handleChangeName = async () => {
    if (album.albumName === albumName) return;
    let docId = album.albumId;
    const albumDocRef = doc(db, `Users/${currentUser.uid}/Albums`, docId);
    try {
      await updateDoc(albumDocRef, { albumName });
      dispatch(updateAlbumName({ docId, albumName }));
    } catch (error) {
      console.error(
        "Couldn't update the document in the collection:",
        error.message
      );
    }
  };

  const handleAddPhoto = async () => {
    let res = await addNewPhotos(currentUser, albumId, newPhotos);

    setSnackbar({ severity: res.severity, message: res.message });
    setShowSnackbar(true);
    dispatch(addPhotosToAlbum({ newPhotosArr: res.newPhotos, albumId }));
  };

  let photos = album.photos.map((photo, index) => ({ ...photo, index }));
  return (
    <>
      <div style={{ position: "relative" }}>
        <div
          className="create-album-form bg-light"
          style={{
            position: "fixed",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            height: "100vh",
            overflowY: "scroll",
            zIndex: "10",
          }}
        >
          <div className="create-album-toolbar py-3 d-flex flex-row justify-content-between">
            <i
              className="fa-solid fa-arrow-left text-secondary fs-3 ms-4 hover-pointer"
              onClick={(e) => {
                setShowAlbumPage(false);
              }}
            ></i>

            <div className="tools me-5">
              <ToolTip tooltip="Add photo">
                <i
                  className="fa-regular fa-square-plus text-secondary fs-5 mx-4 hover-pointer"
                  onClick={() => setShowPhotoSelection(true)}
                ></i>
              </ToolTip>

              <ToolTip tooltip="Delete Album">
                <i
                  className="fa-solid fa-trash text-secondary fs-5 mx-4 hover-pointer"
                  onClick={handleDeleteAlbum}
                ></i>
              </ToolTip>
            </div>
          </div>

          <form
            style={{ position: "relative", zIndex: "40" }}
            className="add-album-form d-flex flex-column align-items-center "
          >
            <input
              id="album-name"
              className="bg-light ps-5 mx-auto my-5"
              type="text"
              value={albumName}
              onChange={(e) => setAlbumName(e.target.value)}
              onBlur={handleChangeName}
            />
            <div className="album-photos-grid d-flex flex-row flex-wrap justify-content-start m-5 px-5">
              {album.photos.map((photo, index) => (
                <AlbumPhoto
                  key={photo.photoId}
                  photo={photo}
                  photoIndex={index}
                  setShowCarousel={setShowCarousel}
                  setActiveIndex={setActiveIndex}
                />
              ))}
            </div>
          </form>
        </div>

        {showCarousel && (
          <AlbumCarousel
            photos={photos}
            setShowCarousel={setShowCarousel}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            albumId={album.albumId}
          />
        )}

        <AddPhotosToAlbum.Provider value={setNewPhotos}>
          {showPhotoSelection && (
            <SelectPhotos
              setShowPhotoSelection={setShowPhotoSelection}
              handleNewAlbum={handleAddPhoto}
              setSelectedPhotos={setNewPhotos}
            />
          )}
        </AddPhotosToAlbum.Provider>
      </div>

      <CustomizedSnackbars
        severity={snackbar.severity}
        message={snackbar.message}
        open={showSnackbar}
        setOpen={setShowSnackbar}
      />
    </>
  );
};

export default AlbumPage;

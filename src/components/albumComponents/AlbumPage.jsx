import { useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../firebase/firebase.config.js";
import { doc, updateDoc } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { useDispatch } from "react-redux";
import { updateAlbumName } from "../../Redux/albums.store";

import AlbumPhoto from "./AlbumPhoto";
import AlbumCarousel from "./AlbumCarousel.jsx";

const AlbumPage = ({ albumId, setShowAlbumPage }) => {
  const album = useSelector((state) => state.albums[albumId]);
  const [albumName, setAlbumName] = useState(album.albumName);
  let [showCarousel, setShowCarousel] = useState(false);
  let [activeIndex, setActiveIndex] = useState(0);
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
          <div className="create-album-toolbar py-3">
            <i
              className="fa-solid fa-arrow-left text-secondary fs-3 ms-4 hover-pointer"
              onClick={(e) => {
                setShowAlbumPage(false);
              }}
            ></i>
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
            albumId={albumId}
          />
        )}
      </div>
    </>
  );
};

export default AlbumPage;

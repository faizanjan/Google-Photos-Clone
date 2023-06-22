import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSharedPhotos } from "../../modules/getSharedPhotos";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { setSharedPhotos } from "../../Redux/sharedPhotos.store";
import { setSharedAlbums } from "../../Redux/sharedAlbums.store";
import { getSharedAlbums } from "../../Redux/getSharedAlbums";

import SharingHeader from "./SharingHeader";
import SharedPhoto from "./SharedPhoto";
import SharingCarousel from "./SharingCarousel";
import AlbumCard from "../albumComponents/AlbumCard";

const Sharing = () => {
  let shared = useSelector((state) => state.sharedPhotos);
  let { receivedPhotos, sentPhotos } = shared;
  let [showCarousel, setShowCarousel] = useState(false);
  let [activeIndex, setActiveIndex] = useState(0);
  const [showSent, setShowSent] = useState(false);
  let photosToDisplay = showSent ? sentPhotos : receivedPhotos;

  let { sharedAlbums } = useSelector((state) => state);
  let albumsToDisplay = showSent
    ? sharedAlbums?.sentAlbums
    : sharedAlbums?.receivedAlbums;

  const dispatch = useDispatch();
  const { currentUser } = useAuth();

  useEffect(() => {
    getSharedPhotos(currentUser).then((sharedPhotosState) => {
      dispatch(setSharedPhotos(sharedPhotosState));
    });
    getSharedAlbums(currentUser).then((sharedAlbumsState) => {
      dispatch(setSharedAlbums(sharedAlbumsState));
    });
  }, []);

  return (
    <>
      <div
        className="d-flex flex-column flex-wrap ms-3"
        style={{ width: "100%" }}
      >
        <SharingHeader showSent={showSent} setShowSent={setShowSent} />

        {albumsToDisplay?.length !== 0 && (
          <div className="mt-5">
            <h4>Albums</h4>
            <div className="albums-grid d-flex flex-row mt-3 ">
              {albumsToDisplay?.map((album) => {
                return (
                  <div className="d-flex flex-column">
                    <AlbumCard
                      key={album.albumId}
                      album={album}
                      isAlbumReceived={!showSent}
                    />
                    <span className="ms-4 text-muted">
                      {showSent ? "To: " + album.to : "From: " + album.from}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {photosToDisplay?.length !== 0 && (
          <div className="mt-5">
            <h4>Photos</h4>
            <div className="shared-photos m-5 mt-4">
              <div className="photo-grid d-flex flex-row flex-wrap">
                {photosToDisplay &&
                  photosToDisplay?.map((photo, index) => {
                    return (
                      <SharedPhoto
                        key={photo.id}
                        photo={photo}
                        index={index}
                        showSent={showSent}
                        showCarousel={() => setShowCarousel(true)}
                        setActiveIndex={setActiveIndex}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </div>

      {showCarousel && (
        <SharingCarousel
          photos={photosToDisplay}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          setShowCarousel={setShowCarousel}
          showSent={showSent}
        />
      )}
    </>
  );
};

export default Sharing;

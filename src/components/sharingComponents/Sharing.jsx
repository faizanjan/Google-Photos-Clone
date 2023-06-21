import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSharedPhotos } from "../../modules/getSharedPhotos";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { setSharedPhotos } from "../../Redux/sharedPhotos.store";
import SharingHeader from "./SharingHeader";

const Sharing = () => {
  let shared = useSelector((state) => state.shared);
  let { receivedPhotos, sentPhotos } = shared;

  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const [showSent, setShowSent] = useState(false);

  let photosToDisplay = showSent ? sentPhotos : receivedPhotos;

  useEffect(() => {
    getSharedPhotos(currentUser).then((sharedPhotosState) => {
      dispatch(setSharedPhotos(sharedPhotosState));
    });
  }, []);

  return (
    <>
      <div className="d-flex flex-column flex-wrap" style={{ width: "100%" }}>
        <SharingHeader showSent={showSent} setShowSent={setShowSent} />

        <div className="received m-5">
          <div className="photo-grid d-flex flex-row flex-wrap">
            {photosToDisplay &&
              photosToDisplay.map((photo) => {
                return (
                  <div
                    className="photo-container d-flex flex-column position-relative mx-1"
                    style={{ margin: "20px 0" }}
                    key={photo.id}
                  >
                    <img
                      src={photo.url}
                      style={{ height: "250px" }}
                      alt="google photo"
                    />
                    <span className="from text-muted">
                      {showSent ? "to: " + photo.to : "from: " + photo.from}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sharing;

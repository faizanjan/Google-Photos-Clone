import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSharedPhotos } from "../../modules/getSharedPhotos";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { setSharedPhotos } from "../../Redux/sharedPhotos.store";

const Sharing = () => {
  let shared = useSelector((state) => state.shared);
  let { receivedPhotos, sentPhotos } = shared;

  const dispatch = useDispatch();
  const { currentUser } = useAuth();

  useEffect(() => {
    getSharedPhotos(currentUser).then((sharedPhotosState) => {
      dispatch(setSharedPhotos(sharedPhotosState));
    });
  }, []);

  return (
    <div className="d-flex flex-column flex-wrap">
      <div className="received m-5">
        <h1>Received</h1>
        <div className="photo-grid d-flex flex-row flex-wrap">
          {receivedPhotos &&
            receivedPhotos.map((photo) => {
              return (
                <div
                  className="photo-container d-flex flex-column position-relative mx-1"
                  style={{ margin: "20px 0" }}
                >
                  <img
                    src={photo.url}
                    style={{ height: "250px" }}
                    alt="google photo"
                  />
                  <span className="from text-muted">from: {photo.from}</span>
                </div>
              );
            })}
        </div>
      </div>

      <div className="sent m-5">
        <h1>Sent</h1>
        <div className="photo-grid d-flex flex-row flex-wrap">
          {sentPhotos &&
            sentPhotos.map((photo) => {
              return (
                <div
                  className="photo-container d-flex flex-column position-relative mx-1"
                  style={{ margin: "20px 0" }}
                >
                  <img
                    src={photo.url}
                    style={{ height: "250px" }}
                    alt="google photo"
                  />
                  <span className="from text-muted">to: {photo.to}</span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Sharing;

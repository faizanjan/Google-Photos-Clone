import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSharedPhotos } from "../../modules/getSharedPhotos";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { setSharedPhotos } from "../../Redux/sharedPhotos.store";

import SharingHeader from "./SharingHeader";
import SharedPhoto from "./SharedPhoto";
import SharingCarousel from "./SharingCarousel";

const Sharing = () => {
  let shared = useSelector((state) => state.shared);
  let { receivedPhotos, sentPhotos } = shared;
  let [showCarousel, setShowCarousel] = useState(false);
  let [activeIndex, setActiveIndex] = useState(0);

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
              photosToDisplay.map((photo, index) => {
                return (
                  <SharedPhoto
                    key={photo.id}
                    photo={photo}
                    index={index}
                    showSent={showSent}
                    showCarousel={()=>setShowCarousel(true)}
                    setActiveIndex={setActiveIndex}
                  />
                );
              })}
          </div>
        </div>
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

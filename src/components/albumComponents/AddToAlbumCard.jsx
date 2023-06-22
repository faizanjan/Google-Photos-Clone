import React, { useState } from "react";
import { addPhotosToAlbum } from "../../modules/addPhotosToAlbum";
import { addPhotosToAlbum as addNewPhoto } from "../../Redux/albums.store";
import { useAuth } from "../../contexts/AuthContext";
import { useDispatch } from "react-redux";

import CustomizedSnackbars from "../secondary_components/Snackbar";

const AddToAlbumCard = ({ album, photo }) => {
  let [snackbar, setSnackbar] = useState({});
  let [showSnackbar, setShowSnackbar] = useState(false);
  let { currentUser } = useAuth();
  let dispatch = useDispatch();

  const addToAlbum = () => {
    addPhotosToAlbum(currentUser, album.albumId, [photo]).then((res) => {
      setSnackbar({ severity: res.severity, message: res.message });
      setShowSnackbar(true)
      dispatch(
        addNewPhoto({ newPhotosArr: res.newPhotos, albumId: album.albumId })
      );
    });
  };

  return (
    <div>
      <div
        className="album-item d-flex flex-row justify-content-start shadow border m-2 hover-pointer"
        onClick={()=>addToAlbum()}
      >
        <img
          className="album-cover rounded m-2"
          style={{
            position: "relative",
            width: "100px",
            height: "100px",
            backgroundImage: `url(${album?.photos?.[0]?.url})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="album-details d-flex flex-column justify-content-center ms-3">
          <span className="fs-5 text-dark my-2">{album.albumName}</span>
          <span className="text-muted">{album.photos.length} photos</span>
        </div>
      </div>

      <CustomizedSnackbars
        severity={snackbar.severity}
        message={snackbar.message}
        open={showSnackbar}
        setOpen={setShowSnackbar}
      />
    </div>
  );
};

export default AddToAlbumCard;

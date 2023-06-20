import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { useState } from "react";
import { db } from "../../firebase/firebase.config.js";
import { doc, updateDoc } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { useDispatch } from "react-redux";
import { updateAlbumName } from "../../Redux/albums.store";

function RenameAlbumModal(props) {
  const [albumName, setAlbumName] = useState(props.albumName);
  let { currentUser } = useAuth();
  let dispatch = useDispatch();

  const handleChangeName = async () => {
    if (props.albumName === albumName) {
      props.onHide();
      return;
    }
    let docId = props.albumId;
    const albumDocRef = doc(db, `Users/${currentUser.uid}/Albums`, docId);
    try {
      await updateDoc(albumDocRef, { albumName });
      dispatch(updateAlbumName({ docId, albumName }));
      props.onHide();
    } catch (error) {
      console.error(
        "Couldn't update the document in the collection:",
        error.message
      );
    }
  };
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className="modal-body d-flex flex-row justify-content-between">
          <div
            className="thumbnail mx-4"
            style={{ width: "120px", height: "120px" }}
          >
            <img src={props.thumbnail} alt="" className="img-fluid" />
          </div>
          <div className="main-body">
            <div className="mb-4 text-dark fs-5">Rename Album</div>
            <input
              type="text"
              style={{
                border: "none",
                outline: "none",
                borderBottom: "1px solid gray",
              }}
              value={albumName}
              onChange={(e) => setAlbumName(e.target.value)}
            />
          </div>
        </div>
      </Modal.Body>
      <div className="footer px-4 d-flex flex-row justify-content-end">
        <Button
          onClick={props.onHide}
          className="mb-3 me-4"
          variant="outline-primary"
        >
          Cancel
        </Button>
        <Button onClick={handleChangeName} className="mb-3">
          Save
        </Button>
      </div>
    </Modal>
  );
}

export default RenameAlbumModal;

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { useRef, useState } from "react";
import { db } from "../../firebase/firebase.config.js";
import { doc, updateDoc } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { useDispatch } from "react-redux";
import { updateAlbumName } from "../../Redux/albums.store.js";

function SharingModal(props) {
  let friendsEmail = useRef();
  let {onHide, sharePhotoWith} = props;
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <div>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Photos_icon_%282020%29.svg/59px-Google_Photos_icon_%282020%29.svg.png?20221017163128"
            alt=""
            className="google-photos-logo me-4"
            style={{width:'35px'}}
          />
          <span className="fs-5 text-dark">Send in Google Photos</span>
        </div>
      </Modal.Header>
      <Modal.Body>
        <input
          ref={friendsEmail}
          type="email"
          placeholder="Enter email of a friend..."
          style={{
            border:'none',
            outline:'none',
            borderBottom: '2px solid #0d6efd',
            fontSize:'1rem'
          }}
          className="mx-auto w-100 p-2 text-secondary mb-5"
        />
      </Modal.Body>
      <div className="footer px-4 d-flex flex-row justify-content-between">
        <Button
          onClick={onHide}
          className="mb-3 me-4"
          variant="outline-primary"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            sharePhotoWith(friendsEmail.current.value);
            onHide();
          }}
          className="mb-3"
        >
          Send
        </Button>
      </div>
    </Modal>
  );
}

export default SharingModal;

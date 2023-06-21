import { useSelector } from "react-redux";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AddToAlbumCard from "./AddToAlbumCard";

function AddToAlbumModal(props) {
  let { onHide } = props;
  let albums = useSelector((state) => state.albums);

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
            style={{ width: "35px" }}
          />
          <span className="fs-5 text-secondary">Add to Album</span>
        </div>
      </Modal.Header>

      <Modal.Body>
        <div className="albums-grid d-flex flex-column mt-3 ">
          {Object.values(albums).map((album) => (
            <AddToAlbumCard album={album}/>
          ))}
        </div>
      </Modal.Body>

      <div className="footer px-4 d-flex flex-row justify-content-between mt-4">
        <Button
          onClick={onHide}
          className="mb-3 me-4"
          variant="outline-primary"
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
}

export default AddToAlbumModal;

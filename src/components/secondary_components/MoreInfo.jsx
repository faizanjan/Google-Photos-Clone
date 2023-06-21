import { db } from "../../firebase/firebase.config.js";
import { doc, updateDoc } from "firebase/firestore";
import {
  archivePhoto,
  unArchivePhoto,
} from "../../Redux/archivePhotos.store.js";
import { addPhoto, deletePhoto } from "../../Redux/photos.store";
import { useDispatch } from "react-redux";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function MoreInfo({ photo, currentUser, setShowAddToAlbum }) {
  let docId = photo.id;

  const dispatch = useDispatch();

  const handleArchive = async () => {
    const photoDocRef = doc(db, `Users/${currentUser.uid}/Photos`, docId);
    try {
      await updateDoc(photoDocRef, { isArchived: true });
      dispatch(deletePhoto(docId));
      dispatch(archivePhoto(photo));
    } catch (error) {
      console.error(
        "Couldn't update the document in the collection:",
        error.message
      );
    }
  };

  const handleUnArchive = async () => {
    const photoDocRef = doc(db, `Users/${currentUser.uid}/Photos`, docId);
    try {
      await updateDoc(photoDocRef, { isArchived: false });
      dispatch(unArchivePhoto(docId));
      dispatch(addPhoto(photo));
    } catch (error) {
      console.error(
        "Couldn't update the document in the collection:",
        error.message
      );
    }
  };

  const handleDownload = () => {
    fetch(photo.url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "";
        link.click();
        URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error downloading the photo:", error);
      });
  };

  return (
    <DropdownButton
      className="d-inline custom-dropdown"
      id="dropdown-basic-button"
      title="&#8942;"
      variant=""
    >
      <Dropdown.Item className="px-4 py-3" disabled>
        Slideshow
      </Dropdown.Item>
      <Dropdown.Item className="px-4 py-3" onClick={handleDownload}>
        Download
      </Dropdown.Item>
      <Dropdown.Item className="px-4 py-3" disabled>
        Rotate Left
      </Dropdown.Item>
      <Dropdown.Item className="px-4 py-3" onClick={()=>setShowAddToAlbum(true)}>
        Add to Album
      </Dropdown.Item>
      {!photo.isArchived && (
        <Dropdown.Item className="px-4 py-3" onClick={handleArchive}>
          Archive
        </Dropdown.Item>
      )}
      {photo.isArchived && (
        <Dropdown.Item className="px-4 py-3" onClick={handleUnArchive}>
          Un-Archive
        </Dropdown.Item>
      )}
    </DropdownButton>
  );
}

export default MoreInfo;

import { db, storage } from "../firebase/firebase.config.js";
import { deleteDoc, doc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { useAuth } from "../contexts/AuthContext.jsx";
import { removePhotoFromTrash } from "../Redux/trashPhotos.store.js";

import MonthGrid from "./MonthGrid.jsx";
import { useDispatch } from "react-redux";

function Bin({ photos }) {
  let { currentUser } = useAuth();
  let dispatch = useDispatch();

  const handleDelete = async (photo) => {
    let docId = photo.id;
    let { path } = photo;
    try {
      let photoDoc = doc(db, `Users/${currentUser.uid}/Photos`, docId);
      let dltref = ref(storage, path);
      await deleteObject(dltref);
      await deleteDoc(photoDoc);
      dispatch(removePhotoFromTrash(docId));
    } catch (error) {
      console.error("Couldn't delete the referenced item:", error.message);
    }
  };

  const emptyBin = () => {
    Object.values(photos)
      .flat()
      .forEach((photo) => {
        handleDelete(photo);
      });
  };

  return (
    <div
      className="photos-container ms-2"
      style={{
        position: "relative",
        overflowY: "scroll",
        width: "100%",
      }}
    >
      <div className="mt-4 pb-3 d-flex flex-row justify-content-between border-bottom">
        <span className="text-dark ms-3 fs-5">Bin</span>
        <span
          className="empty-bin text-secondary me-5 hover-pointer"
          onClick={emptyBin}
        >
          <i className="fa-solid fa-trash-arrow-up text-secondary me-3"></i>
          Empty Bin
        </span>
      </div>
      <div className="month-grid">
        {photos &&
          Object.keys(photos).map((month) => {
            return <MonthGrid key={month} monthPhotos={photos[month]} />;
          })}
      </div>
    </div>
  );
}

export default Bin;

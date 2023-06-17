import { useContext, useState } from "react";
import { db, storage } from "../firebase/firebase.config.js";
import { deleteDoc, doc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { useAuth } from "../contexts/AuthContext.jsx";
import { deletePhoto } from "../Redux/photos.store.js";
import { useDispatch } from "react-redux";
import { CarouselContext } from "./Photos.jsx";

const Photo = ({ photo }) => {
  let [showDelete, setShowDelete] = useState(false);
  let { currentUser } = useAuth();
  let dispatch = useDispatch();

  let {setShowCarousel, setActiveIndex} = useContext(CarouselContext);

  const handleDelete = async (event, path, docId) => {
    event.stopPropagation()
    try {
      let dltref = ref(storage, path);
      await deleteObject(dltref);
    } catch (error) {
      console.error(
        "Couldn't delete the referenced item from storage:",
        error.message
      );
    }
    let photoDoc = doc(db, `Users/${currentUser.uid}/Photos`, docId);
    try {
      await deleteDoc(photoDoc);
    } catch (error) {
      console.error(
        "Couldn't delete the document from collection:",
        error.message
      );
    }
    dispatch(deletePhoto(docId));
  };

  return (
    <div
      className="photo-container d-flex flex-column position-relative"
      style={{ margin: "20px 5px" }}
      onMouseOver={() => setShowDelete(true)}
      onMouseOut={() => setShowDelete(false)}
      onClick={() => {
        setShowCarousel(true);
        setActiveIndex(photo.index)
      }}
    >
      <img src={photo.url} style={{ height: "250px" }} alt="google photo" />
      {showDelete && (
        <i
          className="fa-solid fa-trash-can me-4 shadow-lg"
          onClick={(e) => handleDelete(e,photo.path, photo.id)}
          style={{
            position: "absolute",
            left: "15px",
            top: "15px",
            color: "white",
          }}
        ></i>
      )}
    </div>
  );
};

export default Photo;
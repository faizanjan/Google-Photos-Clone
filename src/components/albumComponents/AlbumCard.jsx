import { useState } from "react";
import { db } from "../../firebase/firebase.config.js";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { useDispatch, useSelector } from "react-redux";
import { deleteAlbum } from "../../Redux/albums.store.js";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import AlbumPage from "./AlbumPage";


const AlbumCard = ({ albumId }) => {
  const [showAlbumPage, setShowAlbumPage] = useState(false);

  const album = useSelector(state=> state.albums[albumId]);
  let { currentUser } = useAuth();
  let dispatch = useDispatch();

  const handleDeleteAlbum = async()=>{
    let docId = album.albumId;
        try {
          let albumDoc = doc(db, `Users/${currentUser.uid}/Albums`, docId);
          await deleteDoc(albumDoc);
          dispatch(deleteAlbum(docId));
        } catch (error) {
          console.error("Couldn't delete the referenced item:", error.message);
        }
  }

  return (
    <>
      <div className="album-card mx-2" onClick={()=>setShowAlbumPage(true)}>
        <div
          className="img-bg rounded m-2"
          style={{
            position: "relative",
            width: "240px",
            height: "240px",
            backgroundImage: `url(${album?.photos?.[0]?.url})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div>
            <DropdownButton
              className="d-inline custom-dropdown"
              id="dropdown-basic-button"
              title="&#8942;"
              variant=""
              style={{ position: "absolute", right: "10px", top: "10px" }}
              onClick={(e)=>{e.stopPropagation()}}
            >
              <Dropdown.Item className="px-4 py-3">Rename Album</Dropdown.Item>
              <Dropdown.Item className="px-4 py-3" onClick={handleDeleteAlbum}>Delete Album</Dropdown.Item>
              <Dropdown.Item className="px-4 py-3">Share Album</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>

        <div className="album-card-details d-flex flex-column ms-3">
          <span className="album-name text-dark">{album?.albumName}</span>
          <span className="album-photos-count fw-light text-muted">
            {album?.photos.length} items
          </span>
        </div>
      </div>

      {showAlbumPage && <AlbumPage album={album} setShowAlbumPage={setShowAlbumPage}/>}
    </>
  );
};

export default AlbumCard;

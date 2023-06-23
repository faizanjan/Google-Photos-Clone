import { useState } from "react";
import { useSelector } from "react-redux";

import CreateAlbum from "./CreateAlbum";
import AlbumCard from "./AlbumCard.jsx";

function Albums() {
  const [showForm, setShowForm] = useState(false);
  let albums = useSelector((state) => state.albums);

  return (
    <div
      className="albums-container ms-2"
      style={{
        position: "relative",
        overflowY: "scroll",
        height: '100vh',
        width: "100%",
      }}
    >
      <div className="albums-header mt-4 pb-3 d-flex flex-row justify-content-between border-bottom">
        <span className="text-dark ms-3 fs-5">Albums</span>
        <span
          className="empty-bin text-secondary me-5 hover-pointer"
          onClick={() => setShowForm(true)}
        >
          <i className="fa-regular fa-square-plus text-secondary me-3"></i>
          Add Album
        </span>
      </div>

      {showForm && <CreateAlbum setShowForm={setShowForm} />}

      <div className="albums-grid d-flex flex-row mt-3 ">
        {Object.values(albums).map((album) => (
          <AlbumCard key={album.albumId} album={album} />
        ))}
      </div>
    </div>
  );
}

export default Albums;

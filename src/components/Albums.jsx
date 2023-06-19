import { useState } from "react";

import CreateAlbum from "./albumComponents/CreateAlbum";

function Albums() {

    const [showForm, setShowForm] = useState(false);
  return (
    <div
      className="albums-container ms-2"
      style={{
        position: "relative",
        overflowY: "scroll",
        width: "100%",
      }}
    >
      <div className="albums-header mt-4 pb-3 d-flex flex-row justify-content-between border-bottom">
        <span className="text-dark ms-3 fs-5">Albums</span>
        <span 
          className="empty-bin text-secondary me-5 hover-pointer"
          onClick={()=>setShowForm(true)}
          >
          <i className="fa-regular fa-square-plus text-secondary me-3"></i>
          Add Album
        </span>
      </div>

      {showForm && <CreateAlbum setShowForm={setShowForm}/> }

    </div>
  );
}

export default Albums;

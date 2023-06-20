import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import {} from "react";

const AlbumCard = ({ album }) => {
  return (
    <div className="album-card mx-2">
      <div
        className="img-bg rounded m-2"
        style={{
          position: "relative",
          width: "240px",
          height: "240px",
          backgroundImage: `url(${album.photos[0].url})`,
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

          >
            <Dropdown.Item className="px-4 py-3">
              Rename Album
            </Dropdown.Item>
            <Dropdown.Item className="px-4 py-3">
              Delete Album
            </Dropdown.Item>
            <Dropdown.Item className="px-4 py-3">
              Share Album
            </Dropdown.Item>
          </DropdownButton>
        </div>

      </div>

      <div className="album-card-details d-flex flex-column ms-3">
        <span className="album-name text-dark">{album.albumName}</span>
        <span className="album-photos-count fw-light text-muted">
          {album.photos.length} items
        </span>
      </div>
    </div>
  );
};

export default AlbumCard;
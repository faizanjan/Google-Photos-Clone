import { useState } from "react";
import { Link } from "react-router-dom";

const Aside = ({pathname}) => {
  let [activeTab, setActiveTab] = useState(pathname);

  return (
    <div className="aside d-flex flex-column pt-0">
      <div className="main-aside-tabs d-flex flex-column mt-1">
        <ul className="py-3 ps-0 mb-0">
          <li
            className={activeTab === "/home/photos" ? "active-aside-tab" : ""}
            onClick={() => setActiveTab("/home/photos")}
          >
            <Link to="/home/photos">
              <i className="fa-solid fa-image me-4"></i>
              <span>Photos</span>
            </Link>
          </li>
          <li
            className={activeTab === "/home/explore" ? "active-aside-tab" : ""}
            onClick={() => setActiveTab("/home/explore")}
          >
            <Link to="/home/explore">
              <i className="fa-solid fa-magnifying-glass me-4"></i>
              <span>Explore</span>
            </Link>
          </li>
          <li
            className={activeTab === "/home/sharing" ? "active-aside-tab" : ""}
            onClick={() => setActiveTab("/home/sharing")}
          >
            <Link to="/home/sharing">
              <i className="fa-solid fa-user-group me-4"></i>
              <span>Sharing</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="library d-flex flex-column ">
        <span className="ms-4 text-muted" style={{ fontSize: "1rem" }}>
          LIBRARY
        </span>
        <ul className="py-3 ps-0 mb-0">
          <li
            className={activeTab === "/home/favourites" ? "active-aside-tab" : ""}
            onClick={() => setActiveTab("/home/favourites")}
          >
            <Link to="/home/favourites">
              <i className="fa-regular fa-star me-4"></i>
              <span>Favourites</span>
            </Link>
          </li>
          <li
            className={activeTab === "/home/albums" ? "active-aside-tab" : ""}
            onClick={() => setActiveTab("/home/albums")}
          >
            <Link to="/home/albums">
              <i className="fa-solid fa-book-bookmark me-4"></i>
              <span>Albums</span>
            </Link>
          </li>
          <li
            className={activeTab === "/home/utilities" ? "active-aside-tab" : ""}
            onClick={() => setActiveTab("/home/utilities")}
          >
            <Link to="/home/utilities">
              <i className="fa-solid fa-check-to-slot me-4"></i>
              <span>Utilities</span>
            </Link>
          </li>
          <li
            className={activeTab === "/home/archive" ? "active-aside-tab" : ""}
            onClick={() => setActiveTab("/home/archive")}
          >
            <Link to="/home/archive">
              <i className="fa-solid fa-file-arrow-down me-4"></i>
              <span>Archive</span>
            </Link>
          </li>
          <li
            className={activeTab === "/home/bin" ? "active-aside-tab" : ""}
            onClick={() => setActiveTab("/home/bin")}
          >
            <Link to="/home/bin">
              <i className="fa-solid fa-trash-can me-4"></i>
              <span>Bin</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="storage pt-4 border-top">
        <li
          className={activeTab === 8 ? "active-aside-tab" : ""}
          onClick={() => setActiveTab(8)}
        >
          <Link to="/home/storage">
            <i className="fa-solid fa-cloud me-4"></i>
            <span>Storage</span>
          </Link>
        </li>
      </div>
    </div>
  );
};

export default Aside;

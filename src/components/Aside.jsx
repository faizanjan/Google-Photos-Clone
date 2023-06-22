import { useState } from "react";
import { Link } from "react-router-dom";

const Aside = ({ pathname }) => {
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
              <div className="d-flex flex-row align-items-center">
                <span className="material-symbols-outlined">photo_library</span>
                <span>Photos</span>
              </div>
            </Link>
          </li>
          <li
            className={activeTab === "/home/explore" ? "active-aside-tab" : ""}
            onClick={() => setActiveTab("/home/explore")}
          >
            <Link to="/home/explore">
              <div className="d-flex flex-row align-items-center">
                <span className="material-symbols-outlined">search</span>
                <span>Explore</span>
              </div>
            </Link>
          </li>
          <li
            className={activeTab === "/home/sharing" ? "active-aside-tab" : ""}
            onClick={() => setActiveTab("/home/sharing")}
          >
            <Link to="/home/sharing">
              <div className="d-flex flex-row align-items-center">
                <span className="material-symbols-outlined">group</span>
                <span>Sharing</span>
              </div>
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
            className={
              activeTab === "/home/favourites" ? "active-aside-tab" : ""
            }
            onClick={() => setActiveTab("/home/favourites")}
          >
            <Link to="/home/favourites">
              <div className="d-flex flex-row align-items-center">
                <span className="material-symbols-outlined">star</span>
                <span>Favourites</span>
              </div>
            </Link>
          </li>
          <li
            className={activeTab === "/home/albums" ? "active-aside-tab" : ""}
            onClick={() => setActiveTab("/home/albums")}
          >
            <Link to="/home/albums">
              <div className="d-flex flex-row align-items-center">
                <span className="material-symbols-outlined">photo_album</span>
                <span>Albums</span>
              </div>
            </Link>
          </li>
          <li
            className={
              activeTab === "/home/utilities" ? "active-aside-tab" : ""
            }
            onClick={() => setActiveTab("/home/utilities")}
          >
            <Link to="/home/utilities">
              <div className="d-flex flex-row align-items-center">
                <span className="material-symbols-outlined">
                  library_add_check
                </span>
                <span>Utilities</span>
              </div>
            </Link>
          </li>
          <li
            className={activeTab === "/home/archive" ? "active-aside-tab" : ""}
            onClick={() => setActiveTab("/home/archive")}
          >
            <Link to="/home/archived">
              <div className="d-flex flex-row align-items-center">
                <span className="material-symbols-outlined">archive</span>
                <span>Archive</span>
              </div>
            </Link>
          </li>
          <li
            className={activeTab === "/home/bin" ? "active-aside-tab" : ""}
            onClick={() => setActiveTab("/home/bin")}
          >
            <Link to="/home/bin">
              <div className="d-flex flex-row align-items-center">
                <span className="material-symbols-outlined">delete</span>
                <span>Bin</span>
              </div>
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
            <div className="d-flex flex-row align-items-center">
              <span className="material-symbols-outlined">cloud</span>
              <span>Storage</span>
            </div>
          </Link>
        </li>
      </div>
    </div>
  );
};

export default Aside;

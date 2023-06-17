import { useState } from "react";
import { Link } from "react-router-dom";

const Aside = () => {
  let [activeTab, setActiveTab] = useState(0);

  return (
    <div className="aside d-flex flex-column pt-0">
      <div className="main-aside-tabs d-flex flex-column mt-1">
        <ul className="py-3 ps-0 mb-0">
          <li
            className={activeTab === 0 ? "active-aside-tab" : ""}
            onClick={() => setActiveTab(0)}
          >
            <Link to="/home/photos">
              <i className="fa-solid fa-image me-4"></i>
              <span>Photos</span>
            </Link>
          </li>
          <li
            className={activeTab === 1 ? "active-aside-tab" : ""}
            onClick={() => setActiveTab(1)}
          >
            <Link to="/">
              <i className="fa-solid fa-magnifying-glass me-4"></i>
              <span>Explore</span>
            </Link>
          </li>
          <li
            className={activeTab === 2 ? "active-aside-tab" : ""}
            onClick={() => setActiveTab(2)}
          >
            <Link to="/">
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
            className={activeTab === 3 ? "active-aside-tab" : ""}
            onClick={() => setActiveTab(3)}
          >
            <Link to="/">
              <i className="fa-regular fa-star me-4"></i>
              <span>Favourites</span>
            </Link>
          </li>
          <li
            className={activeTab === 4 ? "active-aside-tab" : ""}
            onClick={() => setActiveTab(4)}
          >
            <Link to="/">
              <i className="fa-solid fa-book-bookmark me-4"></i>
              <span>Albums</span>
            </Link>
          </li>
          <li
            className={activeTab === 5 ? "active-aside-tab" : ""}
            onClick={() => setActiveTab(5)}
          >
            <Link to="/">
              <i className="fa-solid fa-check-to-slot me-4"></i>
              <span>Utilities</span>
            </Link>
          </li>
          <li
            className={activeTab === 6 ? "active-aside-tab" : ""}
            onClick={() => setActiveTab(6)}
          >
            <Link to="/">
              <i className="fa-solid fa-file-arrow-down me-4"></i>
              <span>Archive</span>
            </Link>
          </li>
          <li
            className={activeTab === 7 ? "active-aside-tab" : ""}
            onClick={() => setActiveTab(7)}
          >
            <Link to="/home/bin">
              <i className="fa-solid fa-trash-can me-4"></i>
              <span>Bin</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="storage ms-3 ps-1 pt-4 border-top">
        <span
          className={activeTab === 8 ? "active-aside-tab" : ""}
          onClick={() => setActiveTab(8)}
        >
          <Link to="/bin">
            <i className="fa-solid fa-cloud me-4"></i>
            <span>Storage</span>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Aside;

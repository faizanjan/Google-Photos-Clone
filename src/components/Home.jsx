import { Routes, Route, useLocation } from "react-router-dom";

import NavBar from "./NavBar";
import Aside from "./Aside";
import Photos from "./Photos";
import Favourites from "./Favourites.jsx";
import Bin from "./Bin";

const Home = () => {
  let {pathname}=(useLocation());
  return (
    <div>
      <NavBar />
      <div className="d-flex flex-row">
        <Aside pathname={pathname}/>
        <Routes>
          <Route path="photos" element={<Photos />} />
          <Route path="favourites" element={<Favourites />} />
          <Route path="bin" element={<Bin />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;

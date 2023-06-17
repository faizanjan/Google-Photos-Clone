import { Routes, Route } from "react-router-dom";

import NavBar from "./NavBar";
import Aside from "./Aside";
import Photos from "./Photos";
import Bin from "./Bin";
const Home = () => {
  return (
    <div>
      <NavBar />
      <div className="d-flex flex-row">
        <Aside />
        <Routes>
          <Route path="photos" element={<Photos />} />
          <Route path="bin" element={<Bin />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;

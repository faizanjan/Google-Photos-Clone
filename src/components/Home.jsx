import { Routes, Route } from "react-router-dom";

import NavBar from "./NavBar";
import Aside from "./Aside";
import Photos from "./Photos";
import Bin from "./Bin";
const Home = () => {
  return (
    <>
      <NavBar />

      <div className="d-flex flex-row">
        <Aside />
        <Routes>
          <Route path="/home" element={<Photos />} />
          <Route path="/bin" element={<Bin />} />
        </Routes>
      </div>
    </>
  );
};

export default Home;

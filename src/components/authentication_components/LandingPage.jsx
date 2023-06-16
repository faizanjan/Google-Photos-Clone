import SignUp from "./SignUp";
import SignIn from "./SignIn";

import { Route, Routes } from "react-router-dom";
const LandingPage = () => {
  return (
    <div className="landing-page d-flex vh-100 vw-100 justify-content-center align-items-center">
      <Routes>
        <Route element={<SignUp />} path="/signup" />
        <Route element={<SignIn />} path="/signin" />
      </Routes>
    </div>
  );
};

export default LandingPage;

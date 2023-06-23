import { Route, Routes } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext.jsx";
import Home from "./components/Home.jsx";
import SignUp from "./components/authenticationComponents/SignUp.jsx";
import SignIn from "./components/authenticationComponents/SignIn.jsx";
import LandingPage from "./components/LandingPage";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<LandingPage />} path="/" />
        <Route element={<SignUp />} path="/signup" />
        <Route element={<SignIn />} path="/signin" />
        <Route element={<Home />} path="/home/*" />
      </Routes>
    </AuthProvider>
  );
};

export default App;

import LandingPage from "./components/authentication_components/LandingPage.jsx";
import AuthProvider from "./contexts/AuthContext.jsx";
import Home from "./components/Home.jsx";

const App = () => {

  return (
    <AuthProvider >
      <LandingPage />
      <Home />
    </AuthProvider>
  );
};

export default App;

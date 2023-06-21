import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

const LandingPage = () => {
  const { currentUser } = useAuth();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setAnimate(true);
  }, []);

  return (
    <div className="landing-page d-flex flex-column align-items-center justify-content-center vh-100">
      <h1
        className={`brand-heading display-4 text-center mb-5 d-flex flex-row align-items-center justify-content-center border-bottom shadow p-5 rounded-3 ${
          animate ? "fade-in" : ""
        }`}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png"
          alt="Google logo"
          style={{ height: "65px" }}
          className="img img-fluid me-4"
        />
        <span className="brand-text">Photos</span>
      </h1>

      <p style={{ fontSize: "4rem", width: "30vw", textAlign: "center" }}>
        The home for your memories
      </p>

      <Link className="m-5" to={currentUser ? "/home/photos" : "/signin"}>
        <button className="btn btn-primary btn-lg py-3 px-5">
          Go to Google Photos
        </button>
      </Link>
    </div>
  );
};

export default LandingPage;

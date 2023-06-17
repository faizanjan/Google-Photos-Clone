import { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

import { Box, TextField, Alert, Button } from "@mui/material";

function SignIn() {
  const [error, setError] = useState();

  const emailRef = useRef();
  const passwordRef = useRef();

  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();

    signIn(emailRef.current.value, passwordRef.current.value)
      .then(() => {
        setError("");
        navigate("/home/photos");
      })
      .catch((error) => {
        setError("Failed to sign in: \n" + error.message);
      });
  };

  return (
    <div
      id="sign-in-container"
      className="shadow border p-5 d-flex flex-column align-items-center"
    >
      {error && <Alert severity="error">{error}</Alert>}
      <div className="ms-2 my-3 d-flex flex-row align-items-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png"
          alt="logo"
          style={{ height: "35px" }}
          className="img img-fluid"
        />
        <h5 className="ms-1 mb-0 text-muted fw-normal">Photos</h5>
      </div>
      <Box
        className="my-4 px-5"
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "35ch" },
        }}
        autoComplete="on"
        onSubmit={handleSignIn}
      >
        <TextField
          id="sign-in-email"
          label="Email"
          type="email"
          variant="outlined"
          inputRef={emailRef}
          required
        />
        <TextField
          id="sign-in-password"
          label="Password"
          type="password"
          autoComplete="current-password"
          inputRef={passwordRef}
          required
        />

        <Button type="submit" variant="outlined">
          SIGN IN
        </Button>
      </Box>
      <span className="text-muted">
        Need an account?
        <Link to="/signup" className="ms-3">
          Sign Up
        </Link>
      </span>
    </div>
  );
}

export default SignIn;

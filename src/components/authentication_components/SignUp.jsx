import { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase.config.js";
import { Link, useNavigate } from "react-router-dom";

import { Box, TextField, Alert, Button } from "@mui/material";

function SignUp() {
  const [error, setError] = useState();

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const repeatPasswordRef = useRef();

  const { signUp, updateDisplayName } = useAuth();
  const navigate = useNavigate();

  const usersCollection = collection(db, "Users");

  let handleSignUp = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== repeatPasswordRef.current.value) {
      setError("Passwords don't match");
      return;
    }

    try {
      let userCredential = await signUp(
        emailRef.current.value,
        passwordRef.current.value
      );
      const user = userCredential.user;
      await updateDisplayName(user, nameRef.current.value);

      let newUserDoc = doc(usersCollection, user.uid);
      await setDoc(newUserDoc, {
        name: nameRef.current.value,
        uid: user.uid,
      });

      setError("");
      navigate("/home");
    } catch (error) {
      setError("Failed to add the User: \n" + error.message);
    }
  };

  return (
    <div
      id="sign-up-container"
      className="shadow border p-5 d-flex flex-column align-items-center"
    >
      {error && <Alert severity="error">{error}</Alert>}
        <div
          className="ms-2 my-3 d-flex flex-row align-items-center"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png"
            alt="logo"
            style={{ height: "35px" }}
            className="img img-fluid"
          />
          <h5 className="ms-1 mb-0 text-muted fw-normal">Photos</h5>
        </div>
      <Box
        className="my-4"
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "35ch" },
        }}
        autoComplete="on"
        onSubmit={(e) => handleSignUp(e)}
      >

        <TextField
          id="sign-up-name"
          label="Name"
          variant="outlined"
          inputRef={nameRef}
          required
        />
        <TextField
          id="sign-up-email"
          label="Email"
          type="email"
          variant="outlined"
          inputRef={emailRef}
          required
        />
        <TextField
          id="sign-up-password"
          label="Password"
          type="password"
          autoComplete="current-password"
          inputRef={passwordRef}
          required
        />
        <TextField
          id="sign-up-repeat-password"
          label="Repeat Password"
          type="password"
          autoComplete="current-password"
          inputRef={repeatPasswordRef}
          required
        />
        <Button type="submit" variant="outlined">
          SIGN UP
        </Button>
      </Box>
      <span className="text-muted">
        Already have an account?{" "}
        <Link to="/signin" className="ms-3">
          Sign In
        </Link>
      </span>
    </div>
  );
}

export default SignUp;

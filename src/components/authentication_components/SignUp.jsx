import { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { collection, setDoc, doc } from "firebase/firestore";
import { db, storage } from "../../firebase/firebase.config.js";

import { Box, TextField, Alert, Button } from "@mui/material";

function SignUp() {
  const [error, setError] = useState();

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const repeatPasswordRef = useRef();

  const { signUp, updateDisplayName } = useAuth();

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
        uid: user.uid
      });
          
      setError("");
    } catch (error) {
      setError("Failed to add the User: \n" + error.message);
    }
  };

  return (
    <div id="sign-up-container">
      {error && <Alert severity="error">{error}</Alert>}
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        // noValidate
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
    </div>
  );
}

export default SignUp;

import { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

import { Box, TextField, Alert, Button } from "@mui/material";

function SignIn() {
  const [error, setError] = useState();

  const emailRef = useRef();
  const passwordRef = useRef();

  const {signIn} = useAuth();

  const handleSignIn = (e) => {
    e.preventDefault();

    signIn(emailRef.current.value, passwordRef.current.value)
      .then(() => {
        setError("");
      })
      .catch((error) => {
        setError("Failed to sign in: \n" + error.message);
      });
  };

  return (
    <div id="sign-in-container">
      {error && <Alert severity="error">{error}</Alert>}
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        // noValidate
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
    </div>
  );
}

export default SignIn;

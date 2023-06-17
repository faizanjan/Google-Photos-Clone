import { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { collection, setDoc, doc, addDoc } from "firebase/firestore";
import { storage, db } from "../../firebase/firebase.config.js";
import { Link, useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { setProfilePhotos } from "../../Redux/profilePhoto.store";
import { Box, TextField, Alert, Button } from "@mui/material";
import { useDispatch } from "react-redux";

function SignUp() {
  const [error, setError] = useState();
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const repeatPasswordRef = useRef();
  const dpRef = useRef();

  const { signUp, updateDisplayName } = useAuth();
  const navigate = useNavigate();

  const dispatch = useDispatch();

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
      const profilePhotosCollection = collection(
        usersCollection,
        user.uid,
        "Profile Photos"
      );

      const storageRef = ref(
        storage,
        `users/${user.uid}/profile-pictures/${dpRef.current.file.name}`
      );
      let snapshot = await uploadBytes(storageRef, dpRef.current.file);
      let path = snapshot.metadata.fullPath;
      let res = await addDoc(profilePhotosCollection, { path });
      let newPhotoRef = ref(storage, path);
      let url = await getDownloadURL(newPhotoRef);

      let newPhoto = {
        id: res.id,
        path,
        url,
        timeCreated: snapshot.metadata.timeCreated,
      };
      dispatch(setProfilePhotos([newPhoto]));

      setError("");
      navigate("/home/photos");
    } catch (error) {
      setError("Failed to add the User: \n" + error.message);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedPhoto(URL.createObjectURL(file));
    dpRef.current.file = file;
  };

  return (
    <div
      id="sign-up-container"
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
        className="my-4"
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "35ch" },
        }}
        autoComplete="on"
        onSubmit={(e) => handleSignUp(e)}
      >
        <input
          type="file"
          name="profile-picture"
          id="profile-picture"
          onChange={handleFileChange}
          className="d-none"
          ref={dpRef}
          required
        />
        <label htmlFor="profile-picture">
          <div
            className="mx-auto position-relative"
            id="dp"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            <img
              className="img-fluid"
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                cursor: "pointer",
              }}
              src={
                selectedPhoto ||
                "https://www.dgvaishnavcollege.edu.in/dgvaishnav-c/uploads/2021/01/dummy-profile-pic.jpg"
              }
              alt=""
            />
            <div
              style={{ position: "absolute", bottom: "10px", right: "10px" }}
            >
              <i
                className="fas fa-camera"
                style={{
                  color: "#fff",
                  backgroundColor: "#000",
                  borderRadius: "50%",
                  padding: "5px",
                }}
              ></i>
            </div>
          </div>
        </label>

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
        Already have an account?
        <Link to="/signin" className="ms-3">
          Sign In
        </Link>
      </span>
    </div>
  );
}

export default SignUp;

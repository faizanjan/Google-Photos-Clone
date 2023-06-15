import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import Backdrop from "../components/secondary_components/Backdrop";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      }
      setIsLoading(false);
    });
  }, []);

  const signIn = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  const updateDisplayName = (user, displayName) => {
    updateProfile(user, { displayName }).catch((error) => {
      console.error("Error updating display name:", error);
    });
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  let value = {
    currentUser,
    setCurrentUser,
    signIn,
    signUp,
    updateDisplayName,
    logOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {isLoading && <Backdrop />}
      {!currentUser && !isLoading && children[0]}
      {currentUser && !isLoading && children[1]}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

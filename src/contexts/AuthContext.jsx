import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

import Backdrop from "../components/secondary_components/Backdrop";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setIsLoading(false);
      } else {
        setCurrentUser(null);
        setIsLoading(false);
      }
    });

    return () => {
      unsubscribe();
      setIsLoading(false);
    };
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
      navigate("/signin");
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
      {isLoading ? <Backdrop /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

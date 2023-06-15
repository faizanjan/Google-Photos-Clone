import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDSJMxSEE-3LScmOeG7lZsVBnXOsYr0Re4",
  authDomain: "photos-3aa17.firebaseapp.com",
  projectId: "photos-3aa17",
  storageBucket: "photos-3aa17.appspot.com",
  messagingSenderId: "218609000082",
  appId: "1:218609000082:web:ecb306606300bafe91504b",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

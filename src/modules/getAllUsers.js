
import { db, storage } from "../firebase/firebase.config.js";
import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref, getMetadata } from "firebase/storage";
import {
  createPhotoObj,
} from "./processPhotos.js";

export async function getAllUsers() {
    const usersCollection = collection(db, "Users");
    let userDocs = await getDocs(usersCollection);
    let usersArr = userDocs.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    
    let usersObj = usersArr.reduce((acc,user)=>{
        acc[user.email]=user;
        return acc;
    },{})
    return usersObj
  }
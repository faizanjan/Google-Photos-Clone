import { db, storage } from "../firebase/firebase.config.js";
import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref, getMetadata } from "firebase/storage";
import {
  createPhotoObj,
} from "./processPhotos.js";

export async function getPhotoUrls(currentUser) {
    const usersCollection = collection(db, "Users");
    const photosCollection = collection(
      usersCollection,
      currentUser.uid,
      "Photos"
    );
    let photoDocs = await getDocs(photosCollection);
    let photoObjs = photoDocs.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    let tempPhotosState = [];

    await Promise.all(
      photoObjs.map(async (obj) => {
        let photoRef = ref(storage, obj.path);
        let { timeCreated } = await getMetadata(photoRef);
        let url = await getDownloadURL(photoRef);
        tempPhotosState = [
          ...tempPhotosState,
          createPhotoObj(obj, url, timeCreated),
        ];
      })
    );
    return tempPhotosState;
  }
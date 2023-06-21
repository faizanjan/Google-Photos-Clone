import { db } from "../firebase/firebase.config.js";
import { collection, getDocs } from "firebase/firestore";

export async function getSharedPhotos(currentUser) {
  const usersCollection = collection(db, "Users");

  const sharedPhotosCollection = collection(
    usersCollection,
    currentUser.uid,
    "Shared Photos"
  );

  const receivedCollection = collection(
    sharedPhotosCollection,
    currentUser.uid,
    "Received"
  );
  const sentCollection = collection(
    sharedPhotosCollection,
    currentUser.uid,
    "Sent"
  );

  let receivedDocs = await getDocs(receivedCollection);
  let receivedPhotos = receivedDocs.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
    type: "received",
  }));

  let sentDocs = await getDocs(sentCollection);
  let sentPhotos = sentDocs.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
    type: "sent",
  }));

  let tempSharedPhotosState = {receivedPhotos, sentPhotos};

  return tempSharedPhotosState;
}

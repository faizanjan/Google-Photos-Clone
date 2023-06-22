import { db } from "../firebase/firebase.config.js";
import { collection, getDocs } from "firebase/firestore";

export async function getSharedAlbums(currentUser) {
  const usersCollection = collection(db, "Users");

  const sharedAlbumsCollection = collection(
    usersCollection,
    currentUser.uid,
    "Shared Albums"
  );

  const receivedCollection = collection(
    sharedAlbumsCollection,
    currentUser.uid,
    "Received"
  );
  const sentCollection = collection(
    sharedAlbumsCollection,
    currentUser.uid,
    "Sent"
  );

  let receivedDocs = await getDocs(receivedCollection);
  let receivedAlbums = receivedDocs.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
    type: "received",
  }));

  let sentDocs = await getDocs(sentCollection);
  let sentAlbums = sentDocs.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
    type: "sent",
  }));

  let tempSharedAlbumsState = { receivedAlbums, sentAlbums };

  return tempSharedAlbumsState;
}

import { db } from "../firebase/firebase.config.js";
import { addDoc, collection } from "firebase/firestore";

export const shareAlbum = async (recipientId, recipientEmail, sender, album) => {
  console.log(album)
  const usersCollection = collection(db, "Users");

  const recipientSharedAlbumsCollection = collection(
    usersCollection,
    recipientId,
    "Shared Albums"
  );

  const senderSharedAlbumsCollection = collection(
    usersCollection,
    sender.uid,
    "Shared Albums"
  );

  const receivedCollection = collection(
    recipientSharedAlbumsCollection,
    recipientId,
    "Received"
  );

  const sentCollection = collection(
    senderSharedAlbumsCollection,
    sender.uid,
    "Sent"
  );

  if (album.photos?.length !== 0) {
    try {
      const albumDoc = {
        ...album,
        from: sender.email,
        to: recipientEmail,
      };

      await addDoc(receivedCollection, albumDoc);
      await addDoc(sentCollection, albumDoc);
    } catch (error) {
      console.error(error.message);
    }
  }
};

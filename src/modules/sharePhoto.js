import { db } from "../firebase/firebase.config.js";
import { addDoc, collection } from "firebase/firestore";

export const sharePhoto = async (recipientId, recipientEmail, sender, photos) => {
    const usersCollection = collection(db, "Users");
  
    const recipientSharedPhotosCollection = collection(
      usersCollection,
      recipientId,
      "Shared Photos"
    );
  
    const senderSharedPhotosCollection = collection(
      usersCollection,
      sender.uid,
      "Shared Photos"
    );
  
    const receivedCollection = collection(
      recipientSharedPhotosCollection,
      recipientId,
      "Received"
    );
  
    const sentCollection = collection(
      senderSharedPhotosCollection,
      sender.uid,
      "Sent"
    );
  
    if (photos?.length !== 0) {
      try {
        for (const photo of photos) {
          await addDoc(receivedCollection, {
            ...photo,
            from: sender.email,
          });
  
          await addDoc(sentCollection, {
            ...photo,
            to: recipientEmail,
          });
        }
      } catch (error) {
        console.error(error.message);
      }
    }
  };
  
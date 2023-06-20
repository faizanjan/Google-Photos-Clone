import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config.js";

export const addPhotosToAlbum = async (currentUser, albumId, photos) => {
  const thisAlbumCollection = collection(
    db,
    `Users/${currentUser.uid}/Albums/${albumId}/Album Photos`
  );

  const photoPromises = photos.map(async (photo) => {
    const newDoc = await addDoc(thisAlbumCollection, photo);
    return {
      idInAlbum: newDoc.id,
      photoId: photo.id,
      url: photo.url
    };
  });

  const newPhotos = await Promise.all(photoPromises);

  return newPhotos;
};

import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase.config.js";


export const addPhotosToAlbum = async (currentUser, albumId, photos) => {
  const thisAlbumCollection = collection(
    db,
    `Users/${currentUser.uid}/Albums/${albumId}/Album Photos`
  );

  const existingPhotosSnapshot = await getDocs(thisAlbumCollection);
  const existingPhotos = existingPhotosSnapshot.docs.map(doc => doc.data());

  const newPhotos = [];
  let existingPhotosCount = 0;
  for (const photo of photos) {
    const isExisting = existingPhotos.some(existingPhoto =>
      existingPhoto.id === photo.id
    );

    if (!isExisting) {
      const newDoc = await addDoc(thisAlbumCollection, photo);
      newPhotos.push({
        idInAlbum: newDoc.id,
        photoId: photo.id,
        url: photo.url
      });
    }
    else(existingPhotosCount++);
  }

  if(existingPhotosCount===1) alert("Photo already exists in this album")
  if(existingPhotosCount>1) alert(`${existingPhotosCount} photos already existed and where not added again`)
  return newPhotos;
};


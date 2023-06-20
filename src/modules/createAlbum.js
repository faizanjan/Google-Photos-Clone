import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config.js";

export const createNewAlbum = async (
  selectedPhotos,
  currentUser,
  albumName
) => {
  if (selectedPhotos.length === 0) {
    alert("Album can't be empty");
    return;
  }
  const usersCollection = collection(db, "Users");

  const albumsCollection = collection(
    usersCollection,
    currentUser.uid,
    "Albums"
  );
  let res = await addDoc(albumsCollection, {
    albumName,
  });

  const thisAlbumCollection = collection(
    albumsCollection,
    res.id,
    `Album Photos`
  );

  let newAlbum = {
    albumId: res.id,
    albumName,
    photos: [],
  };

  await Promise.all(
    selectedPhotos.map(async (photo) => {
      newAlbum.photos.push({ id: photo.id, url: photo.url });
      return await addDoc(thisAlbumCollection, photo);
    })
  );

  return newAlbum;
};

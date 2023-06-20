import { db, storage } from "../firebase/firebase.config.js";
import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref, getMetadata } from "firebase/storage";
import { createPhotoObj } from "./processPhotos.js";

export async function getAlbums(currentUser) {
  const usersCollection = collection(db, "Users");
  const albumsCollection = collection(
    usersCollection,
    currentUser.uid,
    "Albums"
  );
  const albumDocs = await getDocs(albumsCollection);
  const albumObjs = albumDocs.docs.map((doc) => ({
    ...doc.data(),
    albumId: doc.id,
  }));

  const albumsState = {};

  for (const albumObj of albumObjs) {
    const albumCollection = collection(
      albumsCollection,
      albumObj.albumId,
      "Album Photos"
    );
    const albumPhotoDocs = await getDocs(albumCollection);
    const albumPhotoObjs = albumPhotoDocs.docs.map((doc) => ({
      ...doc.data(),
      albumPhotoId: doc.id,
    }));

    const thisAlbumPhotos = [];

    for (const obj of albumPhotoObjs) {
      const photoRef = ref(storage, obj.path);
      const { timeCreated } = await getMetadata(photoRef);
      const url = await getDownloadURL(photoRef);
      thisAlbumPhotos.push(createPhotoObj(obj, url, timeCreated));
    }

    albumsState[albumObj.albumId] = {
      photos: thisAlbumPhotos,
      albumName: albumObj.albumName,
      albumId: albumObj.albumId,
    };
  }

  return(albumsState);
}

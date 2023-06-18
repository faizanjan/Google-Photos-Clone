export let createPhotosArr = (photos) => {
  if(!photos) return []
  return photos
    .map((photo,index) => {
      return { ...photo, timeCreated: new Date(photo.timeCreated), index };
    })
    .reduce((acc, photo) => {
      let key =
        photo.timeCreated.getMonth() + "/" + photo.timeCreated.getFullYear();
      if (acc[key]) acc[key].push(photo);
      else acc[key] = [photo];
      return acc;
    }, {});
};

export let createPhotoObj = (obj, url, timeCreated) => {
  return {
    id: obj.id,
    path: obj.path,
    timeCreated,
    url,
    isFavourite: Boolean(obj.isFavourite),
    isArchived: Boolean(obj.isArchived),
    isDeleted: Boolean(obj.isDeleted),
  };
};

export function filterPhotosByPath(photos) {
  const result = {
    favourites: [],
    bin: [],
    archived: [],
    photos: []
  };

  photos.sort((a, b) => b?.timeCreated.localeCompare(a?.timeCreated));

  photos.forEach(photo => {
    if (photo.isFavourite) {
      result.favourites.push(photo);
    }
    if (photo.isDeleted) {
      result.bin.push(photo);
    }
    if (photo.isArchived) {
      result.archived.push(photo);
    }
    if (!photo.isArchived && !photo.isDeleted) {
      result.photos.push(photo);
    }
  });

  return result;
}

export function getStateKey(pathname){
  let index = pathname.lastIndexOf('/');
  return pathname.substring(index+1);
}
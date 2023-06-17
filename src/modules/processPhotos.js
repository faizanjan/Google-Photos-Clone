export let createPhotosArr = (photos) => {
  return photos
    .map((photo) => {
      return { ...photo, timeCreated: new Date(photo.timeCreated) };
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

export function filterPhotosByPath(photos, pathname) {
  return photos
    .sort((a, b) => b?.timeCreated.localeCompare(a?.timeCreated))
    .filter((photo) => {
      switch (pathname) {
        case "/home/photos":
          return !photo.isArchived && !photo.isDeleted;
        case "/home/favourites":
          return photo.isFavourite;
        case "/home/archive":
          return photo.isArchived;
        case "/home/bin":
          return photo.isDeleted;
        default:
          return false;
      }
    });
}


export function showPhoto(pathname, photo){
  if (pathname === "/home/bin") {
    return photo.isDeleted;
  } else if (pathname === "/home/archive") {
    return photo.isArchived;
  } else if (pathname.startsWith("/home/")){
    return !photo.isDeleted && !photo.isArchived;
  }
}
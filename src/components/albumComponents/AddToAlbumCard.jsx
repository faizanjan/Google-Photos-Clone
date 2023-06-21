import React from 'react'

const AddToAlbumCard = ({album}) => {
  return (
    <div className="album-item d-flex flex-row justify-content-start shadow border m-2 hover-pointer">
              <img
                className="album-cover rounded m-2"
                style={{
                  position: "relative",
                  width: "100px",
                  height: "100px",
                  backgroundImage: `url(${album?.photos?.[0]?.url})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              />
              <div className="album-details d-flex flex-column justify-content-center ms-3">
                <span className="fs-5 text-dark my-2">{album.albumName}</span>
                <span className="text-muted">{album.photos.length} photos</span>
              </div>
            </div>
  )
}

export default AddToAlbumCard
import React, { useState, useEffect } from "react";
import { useFirebase } from "../../util/Firebase";
import { useAuth } from "../../util/UserAuth";
import ImageGallery from "react-image-gallery";
import { useImages } from "../../data/model/PlaceModel";

import "./Place.css";

const Place = ({ place }) => {

  const [images, setImages] = useState([]);

  const firebase = useFirebase();
  const auth = useAuth();

  // Get images from Firebase Storage
  useEffect(() => {
    firebase.images(auth.user.uid, place.id).listAll()
    .then(placeDir => {
      return Promise.all(placeDir.items.map(imgRef => {
        return imgRef.getDownloadURL()
      }));
    })
    .then(urls => {
      setImages(urls.map(url => { 
        return {original: url, thumbnail: url, sizes: 400}
      }));
    });
  }, [auth])

  return (
    <div className="Place">
      <h2 className="PlaceName">{place.name}</h2>
      {images.length > 0 && <div className="ImageGalleryContainer">
        <ImageGallery items={images} showFullscreenButton={false}></ImageGallery>
      </div>}
      <div className="PlaceTextContainer">
        <div className="PlaceInfo">
          <div className="PlaceLocation">
            <span className="PlaceTitle">Location: </span>
            {place.location.formatted}
          </div>
          <div className="PlaceDate">
            <span className="PlaceTitle">Date: </span>
            {place.date.toLocaleDateString("sv")}
          </div>{" "}
          {/* TODO: Dynamic date */}
        </div>
        <div className="PlaceDescriptionContainer">
        {place.description.split(/\n\s*\n/).map((para,idx) => {
          return <p key={idx} className="PlaceDescription">{para}</p>;
        })}
        </div>
      </div>
    </div>
  );
};

export { Place };

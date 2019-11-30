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
        return {original: url, thumbnail: url}
      }));
    });
  }, [auth])

  return (
    <div className="Place">
      <h2 className="PlaceName">{place.name}</h2>
      <ImageGallery items={images}></ImageGallery>
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
      <p className="PlaceDescription">
        <span className="PlaceTitle">Description: </span>
        {place.description}
      </p>
    </div>
  );
};

export { Place };

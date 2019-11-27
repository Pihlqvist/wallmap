import React, { useState, useEffect } from "react";
import ImageGallery from 'react-image-gallery';

import "./Place.css";

const Place = ({ place }) => {
  const [images, setImages] = useState([]);
  console.log("PLACE: ", place);

  useEffect (() => {
    place.imgs
    .then(imgs => {
      setImages(imgs.map(img => {
        return {original: img.i, thumbnail: img.i}
      }));
    });
  }, []);

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
          {place.date.toLocaleDateString('sv')}
        </div>  {/* TODO: Dynamic date */}
      </div>
      <p className="PlaceDescription">
        <span className="PlaceTitle">Description: </span>
        {place.description}
        </p>
    </div>
  );
};

export { Place }
import React, { useState, useEffect } from "react";
import { useFirebase } from "../Firebase";
import { useAuth } from "../Session/UserAuth";
import ImageGallery from 'react-image-gallery';

import "./Place.css";

const Place = ({ place }) => {
  const firebase = useFirebase();
  const auth = useAuth();
  const [imageUrl, setImageUrl] = useState("");
  console.log("PLACE: ", place);

  useEffect (() => {
    console.log("setting image url");
    const listRef = firebase.images(auth.user.uid, place.id);

    listRef.listAll().then((res) => {
      res.items.forEach(function(itemRef) {
        console.log(itemRef);
        itemRef.getDownloadURL()
        .then(url => {
          setImageUrl(url);
        })
        .catch(error => {
          console.error(error);
        });
      });    
    });
  }, [firebase]);

  const images = [
    {
      original: 'https://picsum.photos/id/1018/1000/600/',
      thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
  ];

  return (
    <div className="Place">
      <h2>{place.name}</h2>
      <ImageGallery items={images}></ImageGallery>
      <div className="PlaceInfo">
        <div>{place.location.formatted}</div>
        <div>{place.date.toLocaleDateString('sv')}</div>  {/* TODO: Dynamic date */}
      </div>
      <p>{place.description}</p>
    </div>
  );
};

export { Place }
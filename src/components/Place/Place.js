import React, { useState, useEffect } from "react";
import { useFirebase } from "../Firebase";
import { useAuth } from "../Session/UserAuth";

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

  return (
    <div className="Place">
      <h2>{place.name}</h2>
      <p>
        Location: {place.location.formatted}
      </p>
      <p>Date: {place.date.toLocaleDateString()}</p>
      <p>Description: {place.description}</p>
      <img
        src={imageUrl}
        alt="thumbnail"
      ></img>
    </div>
  );
};

export { Place }
import React, { useState, useEffect } from "react";
import MapBox from "../MapBox/MapBox";
import AddPlace from "../AddPlace/AddPlace";
import { useFirebase } from "../Firebase";
import {Place, PlaceList} from "../Place/Place";
import ModalWrapper from "../Modal/Modal";

import "./Places.css";


const USR_ID = "X4jhoPncjLXpSLJPTJywB0CFo4A2";

const Places = () => {
  const [places, setPlaces] = useState(null);
  const [markers, setMarkers] = useState(null);

  const [modal, setModal] = useState({showing: false, comp: null});
  
  const firebase = useFirebase();
	
  useEffect(() => {
    console.log("setPlaces");
    // Get users places from firebase
    firebase.usrPlace(USR_ID).once('value').then((snapshot) => {
      let keys = Object.keys(snapshot.val());
      let firebasePlaces = Object.values(snapshot.val());
      firebasePlaces.forEach((place, idx) => place.id = keys[idx]);
      setPlaces(firebasePlaces);
    });
  }, []);

  useEffect(() => {
    if (places) {
      console.log("setMarkers");
      setMarkers(
        places.map(place => {
          return { id: place.id, location: place.location };
        })
      );
    }
  }, [places]);

  const handleMarkerClick = evt => {
    let targetId = evt.currentTarget.id;
    let aPlace = places.filter(place => place.id == targetId);
    // console.log("aPlace: ", aPlace);
    setModal({showing: true, comp: <Place place={aPlace[0]} />});
  };
  
	const toggle = () => {
    setModal({showing: !modal.showing, comp: modal.comp})
  }

  return (
    <div className="Places">
      <button 
        onClick={() => setModal({showing: true, comp: <AddPlace />})}
      >
        Add
      </button>
      <button
        disabled={!places}
        onClick={() => setModal({showing: true, comp: <PlaceList places={places} />})}
      >
        List
      </button>
      <MapBox 
        handleMarkerClick={handleMarkerClick} 
        markers={markers} 
      />
      <ModalWrapper
        isShowing={modal.showing}
        hide={toggle}
        Wrapper={modal.comp}
      />
    </div>
  );
};

export default Places;
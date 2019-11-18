import React, { useState, useEffect } from "react";
import MapBox from "../MapBox/MapBox";
import AddPlace from "../AddPlace/AddPlace";
import { useFirebase } from "../Firebase";
import {Place, PlaceList} from "../Place/Place";
import ModalWrapper from "../Modal/Modal";
import { useAuth } from "../Session/UserAuth";

import "./Places.css";

/**
 * Places is a stateful component that contains the users place objects
 * and the map component. This component gives the map the place objects
 * to draw as markers and handels user interactions like adding and 
 * removing places.
 */
const Places = () => {
  const [places, setPlaces] = useState(null);
  const [markers, setMarkers] = useState(null);

  const [modal, setModal] = useState({showing: false, comp: null});
  
  const firebase = useFirebase();
  const auth = useAuth();
  
  // Get user place from fierbase
  useEffect(() => {
    if (auth.user) {
      firebase.place(auth.user.uid).on('value', (snapshot) => {
        let keys = Object.keys(snapshot.val());
        let firebasePlaces = Object.values(snapshot.val());
        firebasePlaces.forEach((place, idx) => place.id = keys[idx]);
        setPlaces(firebasePlaces);
      });
    }
  }, [auth, firebase]);

  // Create markers from place objects
  useEffect(() => {
    if (places) {
      setMarkers(
        places.map(place => {
          return { id: place.id, location: place.location };
        })
      );
    }
  }, [places]);

  // When a marker have been clicked we open a place component 
  // with the corresponding place object
  const handleMarkerClick = evt => {
    let targetId = evt.currentTarget.id;
    let aPlace = places.filter(place => place.id == targetId);
    setModal({showing: true, comp: <Place place={aPlace[0]} />});
  };
  
  // Toggle a model
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
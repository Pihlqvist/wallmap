import React, { useState, useEffect } from "react";
import MapBox from "../MapBox/MapBox";
import AddPlace from "../AddPlace/AddPlace";
import { useFirebase } from "../Firebase";
import {Place, PlaceList} from "../Place/Place";
import ModalWrapper from "../Modal/Modal";
import { useAuth } from "../Session/UserAuth";

import "./Places.css";

const Places = () => {
  const [places, setPlaces] = useState(null);
  const [markers, setMarkers] = useState(null);

  const [modal, setModal] = useState({showing: false, comp: null});
  
  const firebase = useFirebase();
  const auth = useAuth();
	
  useEffect(() => {
    if (auth.user) {  // TODO: Change this to work with PrivateRouter
      console.log("setPlaces");
      // Get users places from firebase
      firebase.usrPlace(auth.user.uid).on('value', (snapshot) => {
        let keys = Object.keys(snapshot.val());
        let firebasePlaces = Object.values(snapshot.val());
        firebasePlaces.forEach((place, idx) => place.id = keys[idx]);
        console.log(firebasePlaces);
        setPlaces(firebasePlaces);
      });
    }
  }, [auth]);

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

  const hide = () => {
    setModal({showing: false, comp: null});
  }

  console.log(modal);

  return (
    <div className="Places">
      <button 
        onClick={() => setModal({showing: true, comp: <AddPlace hide={hide}/>})}
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
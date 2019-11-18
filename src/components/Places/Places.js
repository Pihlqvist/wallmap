import React, { useState, useEffect } from "react";
import MapBox from "../MapBox/MapBox";
import AddPlace from "../AddPlace/AddPlace";
import { useFirebase } from "../Firebase";
import {Place, PlaceList} from "../Place/Place";
import ModalWrapper from "../Modal/Modal";

import "./Places.css";


const temp_places = [
  {
    id: 1,
    name: "Place1",
    location: { lat: 37.78, lng: -122.41 },
    date: Date("today"),
    description: "description1",
    images: [{ img: "img1" }, { img: "img2" }],
    chat: null
  },
  {
    id: 2,
    name: "Place2",
    location: { lat: 37.0, lng: -122.0 },
    date: Date("today"),
    description: "description2",
    images: [{ img: "img1" }, { img: "img2" }],
    chat: null
  }
];

function later(delay) {
  return new Promise(function(resolve) {
    setTimeout(resolve, delay);
  });
}

const Places = () => {
  const [places, setPlaces] = useState(null);
  const [markers, setMarkers] = useState(null);

  const [modal, setModal] = useState({showing: false, comp: null});
  
  const firebase = useFirebase();
	
  useEffect(() => {
    console.log("setPlaces");
    later(4000).then(() => setPlaces(temp_places));
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
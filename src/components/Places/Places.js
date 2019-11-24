import React, { useState, useEffect } from "react";
import MapBox from "../MapBox/MapBox";
import AddPlace from "../AddPlace/AddPlace";
import { useFirebase } from "../Firebase";
import {Place} from "../Place/Place";
import ModalWrapper from "../Modal/Modal";
import { useAuth } from "../Session/UserAuth";
import PlaceTable from "../Place/PlaceTable";

import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';

import "./Places.css";

/**
 * Places is a stateful component that contains the users place objects
 * and the map component. This component gives the map the place objects
 * to draw as markers and handels user interactions like adding and 
 * removing places.
 */
const Places = () => {
  const [markers, setMarkers] = useState(null);
  const [modal, setModal] = useState({showing: false, comp: null});
  
  const firebase = useFirebase();   // TODO: Needed after places hook ?
  const auth = useAuth();           // TODO: Needed after places hook ?
  const places = usePlaces();

  // Create markers from place objects
  useEffect(() => {
    if (places) {
      setMarkers(
        places.map(place => {
          return { id: place.id, location: place.location.geometry };
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

  const selectPlace = (id) => {
    let aPlace = places.filter(place => place.id == id);
    if (!aPlace) {
      console.error("Place not in array");
      return;
    }
    setModal({showing: true, comp: <Place place={aPlace[0]} />});
  }
  
  const hide = () => {
    setModal({showing: false, comp: modal.comp});
  }

  return (
    <div className="Places">
      <MapButtons 
        onClickAdd={() => setModal({showing: true, comp: <AddPlace hide={hide}/>})}
        onClickList={() => setModal(
          {
            showing: true, 
            comp: <PlaceTable places={places} selectPlace={selectPlace} />
          }
        )}
      />
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

// Button panel to interact with the map
const MapButtons = ({onClickAdd, onClickList}) => {
  return (
    <div className="MapButtons">
      <Fab className="AddBtn MapBtn" onClick={onClickAdd}>
        <Icon>add</Icon>
      </Fab>
      <Fab className="ListBtn MapBtn" onClick={onClickList}>
        <Icon>list</Icon>
      </Fab>
    </div>
  );
}

/**
 * Place hook, gives the users places in a format that is
 * expected by the rest of the app.
 */
const usePlaces = () => {
  // TODO: Init as null or empty list?
  const [places, setPlaces] = useState(null);

  const auth = useAuth();
  const firebase = useFirebase();

  /**
   * Given a Firebase snapshot of place it returns an array of 
   * place objects that the webapp can work with.
   * @param {Object} snapshot snapshot from firebase
   * @return {Array} List of place objects 
   */
  const convert = (snapshot) => {
    let keys = Object.keys(snapshot.val());
    let firebasePlaces = Object.values(snapshot.val());
    firebasePlaces.forEach((place, idx) => {
      place.id = keys[idx];             // Add key as object id
      place.date = new Date(place.date);    // Convert date to object
    });
    return firebasePlaces;
  }

  // Get user place from fierbase
  useEffect(() => {
    if (auth.user) {
      firebase.place(auth.user.uid).on('value', (snapshot) => {
        setPlaces(convert(snapshot));
      });
    } else {
      setPlaces([]);
    }
  }, [auth, firebase]);

  return places;
}

export default Places;

export { usePlaces }
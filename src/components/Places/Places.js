import React, { useState, useEffect } from "react";
import MapBox from "../MapBox/MapBox";
import AddPlace from "../AddPlace/AddPlace";
import ModalWrapper from "../Modal/Modal";
import PlacesTable from "../PlacesTable/PlacesTable";
import { usePlaces } from "../../data/model/PlaceModel";
import { Place } from "../Place/Place";
import { ProfileBtn } from "../Profile/Profile";

import Fab from "@material-ui/core/Fab";
import Icon from "@material-ui/core/Icon";

import "./Places.css";

/**
 * Places is a stateful component that contains the users place objects
 * and the map component. This component gives the map the place objects
 * to draw as markers and handels user interactions like adding and
 * removing places.
 */
const Places = () => {
  const [markers, setMarkers] = useState(null);
  const [modal, setModal] = useState({
    showing: false,
    comp: null,
    bckgrnd: true
  });

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
    selectPlace(evt.currentTarget.id);
  };

  // Toggle the modal
  const toggle = () => {
    setModal({
      showing: !modal.showing,
      comp: modal.comp,
      bckgrnd: modal.bckgrnd
    });
  };

  // Hide the modal
  const hide = () => {
    setModal({ showing: false, comp: modal.comp, bckgrnd: modal.bckgrnd });
  };

  // Displays the place with the given id in a modal
  const selectPlace = pid => {
    let aPlace = places.filter(place => place.id === pid);
    if (!aPlace) {
      console.error("Place not in array");
      return;
    }
    setModal({
      showing: true,
      comp: <Place place={aPlace[0]} />,
      bckgrnd: true
    });
  };

  // Clicked on the map not a marker. 
  const handleMapClick = evt => {
    evt.preventDefault(); // Prevent context menu
    setModal({
      showing: true,
      comp: <AddPlace hide={hide} preLocation={evt.lngLat} />,
      bckgrnd: true
    });
  };

  return (
    <div className="Places">
      <MapButtons
        onClickAdd={() =>
          setModal({
            showing: true,
            comp: <AddPlace hide={hide} />,
            bckgrnd: true
          })
        }
        onClickList={() =>
          setModal({
            showing: true,
            comp: <PlacesTable places={places} selectPlace={selectPlace} />,
            bckgrnd: false
          })
        }
      />
      <ProfileBtn />
      <MapBox
        handleMapClick={handleMapClick}
        handleMarkerClick={handleMarkerClick}
        markers={markers}
      />
      <ModalWrapper
        isShowing={modal.showing}
        hide={toggle}
        Wrapper={modal.comp}
        bckgrnd={modal.bckgrnd}
      />
    </div>
  );
};

// Button panel to interact with the map
const MapButtons = ({ onClickAdd, onClickList }) => {
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
};

export default Places;

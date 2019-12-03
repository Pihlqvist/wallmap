import React, { useState, useEffect } from "react";
import MapBox from "../MapBox/MapBox";
import AddPlace from "../AddPlace/AddPlace";
import ModalWrapper from "../Modal/Modal";
import PlacesTable from "../PlacesTable/PlacesTable";
import { usePlaces } from "../../data/model/PlaceModel";
import { Place } from "../Place/Place";
import Profile, { ProfileBtn } from "../Profile/Profile";

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

  const handleProfileClick = () => {
    setModal({
      showing: true,
      comp: <Profile />,
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
        onClickHelp={() => 
          setModal({
            showing: true, 
            comp: <PlacesHelp hide={hide} />,
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
        displayList={places && places.length > 0}
      />
      <ProfileBtn handleProfileClick={handleProfileClick} />
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
const MapButtons = ({ onClickAdd, onClickHelp, onClickList, displayList }) => {
  const listStyle = displayList ? {} : { display: "none" };

  return (
    <div className="MapButtons">
      <Fab className="AddBtn MapBtn" onClick={onClickAdd}>
        <Icon>add</Icon>
      </Fab>
      <Fab className="ListBtn MapBtn" onClick={onClickList} style={listStyle}>
        <Icon>list</Icon>
      </Fab>
      <Fab className="HelpBtn MapBtn" onClick={onClickHelp}>
        <span className="QuestionMark">?</span>
      </Fab>
    </div>
  );
};

// Help component 
const PlacesHelp = () => (
  <div className="PlacesHelp">
    <div className="PlacesHelpHeader">
      <h1>Need help in using WallMap ? </h1>
      <h2>Bellow is a short guideline</h2>
    </div>
    <div className="PlacesHelpDescription">
      <section>
        <h3>Adding a place you have visited:</h3>
        <p>You can add a place in two ways that are very simple.</p>
        <ul>
          <li>Through left clicking the add icon/button on the left side of the page: This will then open the Add place form and you can fill it and add pictures if you want. The location field gives you suggestions while you are filling it, which will make it easier for you to not needing to remember in advance the exact address of the location.</li>
          <li>Through right clicking with your mouse on the map if you know where on the map the location is: This fills up automatically the location field in the Add place form that opens up after you right click.</li>
        </ul>
      </section>
      <section>
        <h3>Seeing a list of your places:</h3>
        <p>You can see all places you have added as a list by left-clicking on the list icon on the left side of the page (button with three lines). When clicking that button the list will be shown. You can sort the places by name, country or date. You can go directly to one of the places by clicking on the actions icon besides the place you want to look further at. There in the Places list you can also search through the search bar for a specific place you have added. And  you can also delete a place if you don't want to have it anymore. By deleting a place, the place and all accompanying info and images will all be deleted from our servers and can not be restored.</p>
      </section>
      <section>
        <h3>Looking at one place you added:</h3>
        <p>You can see a place you added also simply by left-clicking on the corresponding pin on the map. This will open up the info and image gallery for the images you have added. If you haven'd added any images then you will only see the info you added.</p>
      </section>
      <section>
        <h3>Seeing your profile info and editing it</h3>
        <p>You can see your profile info and edit it (name and Password) by left-clicking on the the user icon-button  on the upper-right corner of the page. After clicking it click again on Profile. Then you will get to form which will show your current name and bellow it an input form for password which is empty. Edit your name if you want to change it. Edit your password if you want to change it. Or edit both if you want to change both. Then click submit. You need to be recently logged in in order to edit your profile for security reasons. </p>
      </section>
      <section>
        <h3>Signing out</h3>
        <p>You can sign out by first left-clicking on the the user icon-button on the upper-right corner of the page. After clicking it click again on Log out. Then you will be signed out and returned to the log in page. </p>
      </section>
      <section>
        <h3>Zooming</h3>
        <p>You can zoom in or out in the map in two ways. Either through mouse scroll (if multi-touch pad then using two fingers zooming) or through the grey zoom buttons on the right bottom corner of the page.</p>
      </section>

    </div>
  </div>
)
export default Places;

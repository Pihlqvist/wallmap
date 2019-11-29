import React, { useState } from "react";
import { usePlaces } from "../Places/Places";
import { useFirebase } from '../../util/Firebase';
import { useAuth } from "../../util/UserAuth";

import "./PlaceTable.css";

const PlaceTable = ({ selectPlace }) => {

  const [sortMethod, setSortMethod] = useState({col: "name", reverse: false});

  const places = usePlaces();

  return places ? (
    <table className="PlaceTable">
      <thead>
        <tr>
          <th className="PlaceRow">Img</th>
          <th className="RowName" 
            onClick={() => setSortMethod({col: "name", reverse: !sortMethod.reverse})}
          >
              <span>Name</span> <SortDisplay show={sortMethod.col === "name"} up={sortMethod.reverse}/>
          </th>
          <th className="RowLocation">Location</th>
          <th className="RowDate" 
            onClick={() => setSortMethod({col: "date", reverse: !sortMethod.reverse})}
          >
            Date  <SortDisplay show={sortMethod.col === "date"} up={sortMethod.reverse}/>
          </th>
          <th className="RowBtn">Edit</th>
          <th className="RowBtn">Remove</th>
        </tr>
      </thead>
      <tbody>
        { places.sort(sorter[sortMethod.col]).map(place => (
          <PlaceRow key={place.id} place={place} selectPlace={selectPlace} />
        ))}
      </tbody>
    </table>
  ) : null;
};

const PlaceRow = ({ place, selectPlace }) => {
  const firebase = useFirebase();
  const auth = useAuth();

  const handelRowClick = (evt) => {
    // If we din't click an icon go to place
    if (evt.target.nodeName !== "I") {
      selectPlace(place.id);
    } 
  }

  // Remove the place 
  const removePlace = () => {
    let respones = window.confirm(`Want to remove ${place.name}?`);
    if (respones) {
      const mes = firebase.placeref(auth.user.uid, place.id).remove();
      console.log(mes);
    }
  }

  return (
    <tr onClick={(evt) => handelRowClick(evt)}>
      <td>
        <img alt="p" />
      </td>
      <td>{place.name}</td>
      <td>{place.location.formatted}</td>
      <td>{place.date.toLocaleDateString()}</td>
      <td>
        <i className="material-icons">edit</i>
      </td>
      <td>
        <i className="material-icons" onClick={() => removePlace()}>remove_circle_outline</i>
      </td>
    </tr>
  );
};

const sorter = {
  date: (a, b) => {
    if (a.date > b.date) return 1;
    else if (a.date < b.date) return -1;
    else return 0;
  },
  name: (a, b) => {
    let nameA = a.name.toUpperCase(); // ignore upper and lowercase
    let nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA > nameB) return 1;
    else if (nameA < nameB) return -1;
    else return 0;
  }
}

const SortDisplay = ({show, up}) => {
  return show ? (
    up ? (
    <i className="material-icons">
      arrow_drop_up
    </i>
    ) : (
    <i className="material-icons">
      arrow_drop_down
    </i>
    )
  ) : null;
}

export default PlaceTable;
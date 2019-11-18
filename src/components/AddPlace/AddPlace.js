import React, { useState } from "react";
import { useAuth } from "../Session/UserAuth";

import "./AddPlace.css";
import { useFirebase } from "../Firebase";
import { AssertionError } from "assert";

const AddPlace = ({hide}) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState("0");
  const [lng, setLng] = useState("0");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const auth = useAuth();
  const firebase = useFirebase();

  const handleSubmit = evt => {
    evt.preventDefault();
    const refKey = firebase.usrPlace(auth.user.uid).push({
      name,
      location: {lat: parseInt(lat), lng: parseInt(lng)},
      date: Date(date),
      description,
      image: "",
    });
    //console.log(refKey);
    hide();
  };

  const isInvalid =
    description === "" ||
    date === "" ||
    name === "" ||
    lat === "" || lng === "";

  return (
    <form className="AddPlace" onSubmit={handleSubmit}>
      <Row label="Name:">
				<input 
					value={name} 
					onChange={evt => setName(evt.target.value)}
				/>
      </Row>
      <Row label="Location:">
        <input 
          placeholder="latitude"
          type="number"
          value={lat} 
          step="0.05"
          min={-90}
          max={90}
					onChange={ evt => setLat(evt.target.value)} 
				/>
        <input
          placeholder="longitude"
          type="number"
          value={lng}
          step="0.05"
          min={-180}
          max={180}
          onChange={ evt => setLng(evt.target.value)}
        />
      </Row>
      <Row label="Date:">
				<input 
					value={date} 
					type="date"
					onChange={evt => setDate(evt.target.value)} 
				/>
      </Row>
      <Row label="Description">
				<input 
					value={description} 
					onChange={evt => setDescription(evt.target.value)} 
				/>
      </Row>
      <Row label="Image (Images)">
				<input
          disabled={true}
					value={image} 
					type="file" 
					onChange={evt => setImage(evt.target.value)} 
				/>
      </Row>
      <Row>
				<input disabled={isInvalid} type="submit" />
      </Row>
    </form>
  );
};

const Row = props => (
  <div className="Row">
    <span className="rowTitle">{props.label}</span>
    <span className="rowContent">{props.children}</span>
  </div>
);

export default AddPlace;
import React, { useState } from "react";

import "./AddPlace.css";

const AddPlace = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = evt => {
		evt.preventDefault();
  };

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
					value={location} 
					onChange={ evt => setLocation(evt.target.value)} 
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
					value={image} 
					type="file" 
					onChange={evt => setImage(evt.target.value)} 
				/>
      </Row>
      <Row>
				<input type="submit" />
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
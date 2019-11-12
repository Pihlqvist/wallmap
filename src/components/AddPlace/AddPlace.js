import React, {useState} from 'react';

import './AddPlace.css';

const AddPlace = () => {
	const [name, setName] = useState("");
	const [location, setLocation] = useState("");
	const [date, setDate] = useState(null);
	const [description, setDescription] = useState("");
	const [image, setImage] = useState(null); 

	const handleNameChange = evt => setName(evt.target.value);
	
	const handleLocationChange = evt => setLocation(evt.target.value);
	
	const handleDateChange = evt => setDate(evt.target.value);

	const handleDescriptionChange = evt => setDescription(evt.target.value);
	
	const handleImageChange = evt => setImage(evt.target.value);

	const handleSubmit = evt => {
		evt.preventDefault();
	}

	return (
		<form className="AddPlace" onSubmit={handleSubmit}>
			<Row label="Name:">
				<input 
					value={name}
					onChange={handleNameChange}
				/>
			</Row>
			<Row label="Location:">
				<input 
					value={location}
					onChange={handleLocationChange}
				/>
			</Row>
			<Row label="Date:">
				<input 
					value={date}
					type="date"
					onChange={handleDateChange}
				/>
			</Row>
			<Row label="Description">
				<input 
					value={description}
					onChange={handleDescriptionChange}
				/>
			</Row>
			<Row label="Image (Images)">
				<input 
					value={image}
					type="file"
					onChange={handleImageChange}
				/>
			</Row>
			<Row>
				<input 
					type="submit"
				/>
			</Row>
		</form>
	);
}
export default AddPlace;

const Row = props => (
	<div className="Row">
		<span className="rowTitle">{props.label}</span>
<span className="rowContent">{props.children}</span>
	</div>
)

import React, {useState} from "react";

const Place = ({ place }) => {
  console.log("PLACE: ", place);
  return (
    <div className="Place">
      <h2>{place.name}</h2>
      <p>
        Location: {place.location.lat}, {place.location.lng}
      </p>
      <p>Date: {place.date}</p>
      <p>Description: {place.description}</p>
      <img
        src={`https://picsum.photos/300/200?random&t=${new Date().getTime()}`}
        alt="thumbnail"
      ></img>
    </div>
  );
};

const PlaceList = ({ places }) => {
	const [place, setPlace] = useState(null);

	return (
		<div className="PlaceList">
			<ul>
				{places.map(place => {return (
						<li key={place.id}>{place.name}</li>
				);})}
			</ul>
		</div>
	);
}

export {Place, PlaceList}
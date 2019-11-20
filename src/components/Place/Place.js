import React from "react";

const Place = ({ place }) => {
  return (
    <div className="Place">
      <h2>{place.name}</h2>
      <p>
        Location: {place.location.lat}, {place.location.lng}
      </p>
      <p>Date: {place.date.toLocaleDateString()}</p>
      <p>Description: {place.description}</p>
      <img
        src={`https://picsum.photos/300/200?random&t=${new Date().getTime()}`}
        alt="thumbnail"
      ></img>
    </div>
  );
};

export { Place }
import React, {useState} from "react";
import ReactMapGL from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

const MapBox = () => {

  const [viewport, setViewPort] = useState({
    width: "100vw",
    height: "100vw",
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  })

  return (
    <div className="MapBox">
      <ReactMapGL 
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        onViewportChange={viewport => setViewPort({...viewport })}
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
      />
    </div>
  );
}

export default MapBox;
import React, { useState, useEffect } from "react";
import ReactMapGL, { BaseControl, Marker } from "react-map-gl";
import useWindowSize from "../Hooks/WindowSize";
import * as DIMENSIONS from "../../data/constants/dimensions";

import "./MapBox.css";

const INIT_VIEWPORT = {
  latitude: 20,
  longitude: 0,
  zoom: 1.30,
  minZoom: 1.30, 
  maxZoom: 5,  
}

const MapBox = ({handleMarkerClick, markers, handleMapClick}) => {

  const size = useWindowSize();

  const [viewport, setViewPort] = useState({
    width: size.width,
    height: size.height,
    ...INIT_VIEWPORT, 
  })

  // Update the size of the map so it fits the screen
  useEffect(() => {
    setViewPort({
      width: size.width,
      height: size.height,
      ...INIT_VIEWPORT,    
    });
  }, [size]);

  return (
    <div className="MapBox">
      <ReactMapGL 
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        onViewportChange={viewport => setViewPort({...viewport })}
        mapStyle="mapbox://styles/eltom/ck3a7vlk607ez1cqv67nb9tjn"
        onContextMenu={handleMapClick}
      >
      {markers && markers.map(mark => { 
          return <Marker 
            latitude={mark.location.lat} 
            longitude={mark.location.lng} 
            key={mark.id}
          >
            <div
              className="CustomMarker"
              onClick={handleMarkerClick}
              id={mark.id}
            /> 
          </Marker> 
        })}
      </ReactMapGL>
    </div>
  );
}


export default MapBox;
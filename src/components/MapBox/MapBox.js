import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, NavigationControl } from "react-map-gl";
import useWindowSize from "../../util/WindowSize";

import "./MapBox.css";

const INIT_VIEWPORT = {
  latitude: 20,
  longitude: 0,
  zoom: 1.3,
  minZoom: 1.3,
  maxZoom: 5
};

const MapBox = ({ handleMarkerClick, markers, handleMapClick }) => {
  const size = useWindowSize();

  const [viewport, setViewPort] = useState({
    width: size.width,
    height: size.height,
    ...INIT_VIEWPORT
  });

  // Update the size of the map so it fits the screen
  useEffect(() => {
    setViewPort({
      width: size.width,
      height: size.height,
      ...INIT_VIEWPORT
    });
  }, [size]);

  return (
    <div className="MapBox">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        onViewportChange={viewport => setViewPort({ ...viewport })}
        mapStyle="mapbox://styles/eltom/ck3a7vlk607ez1cqv67nb9tjn"
        onContextMenu={handleMapClick}
      >
        <div className="WaterMark">
          WallMap
        </div>
        <div className="NavigationControl">
          <NavigationControl 
            showCompass={false} 
            onViewportChange={viewport => setViewPort({ ...viewport, minZoom:1.3, maxZoom:5 })}
          />
        </div>
        {markers &&
          markers.map(mark => {
            return (
              <Marker
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
            );
          })}
      </ReactMapGL>
    </div>
  );
};

export default MapBox;

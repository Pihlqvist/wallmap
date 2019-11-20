import React, { useState, useEffect } from "react";
import ReactMapGL, { BaseControl } from "react-map-gl";
import useWindowSize from "../Hooks/WindowSize";
import * as DIMENSIONS from "../../data/constants/dimensions";

import "./MapBox.css";

const INIT_VIEWPORT = {
  latitude: 20,
  longitude: 0,
  zoom: 1,  
}

const MapBox = ({handleMarkerClick, markers}) => {

  const size = useWindowSize();

  const [viewport, setViewPort] = useState({
    width: size.width,
    height: size.height-DIMENSIONS.NAVIGATION_BAR_HEIGHT,
    ...INIT_VIEWPORT,
  })

  // Update the size of the map so it fits the screen
  useEffect(() => {
    setViewPort({
      width: size.width,
      height: size.height-DIMENSIONS.NAVIGATION_BAR_HEIGHT,
      ...INIT_VIEWPORT,    
    });
  }, [size]);

  return (
    <div className="MapBox">
      <ReactMapGL 
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        onViewportChange={viewport => setViewPort({...viewport })}
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
      >
      {markers && markers.map(mark => { 
          return <CustomMarker 
            latitude={mark.location.lat} 
            longitude={mark.location.lng} 
            key={mark.id}
            id={mark.id}
            handleMarkerClick={handleMarkerClick}
          /> 
        })}
      </ReactMapGL>
    </div>
  );
}

class CustomMarker extends BaseControl {

  _render() {
    const {longitude, latitude} = this.props;

    const [x, y] = this._context.viewport.project([longitude, latitude]);

    const markerStyle = {
      // position: 'absolute',
      // background: '#fff',
      left: x,
      top: y
    };

    return (
      <div 
        className="CustomMarker" 
        ref={this._containerRef} 
        onClick={this.props.handleMarkerClick} 
        style={markerStyle}
        id={this.props.id}
      >
        {/* <span className="CustomMarkerText">{this.props.id}</span> */}
      </div>
    );
  }
}

export default MapBox;
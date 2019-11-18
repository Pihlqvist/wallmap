import React, {useState} from "react";
import ReactMapGL, {BaseControl} from "react-map-gl";

import 'mapbox-gl/dist/mapbox-gl.css';
import "./MapBox.css";

const MapBox = ({handleMarkerClick, markers}) => {

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
        <span className="CustomMarkerText">{this.props.id}</span>
      </div>
    );
  }
}

export default MapBox;
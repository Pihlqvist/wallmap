import React, { Component } from 'react';
import GoogleMapMap from './GoogleMapMap.js';
import './Map.css';

/**
 * This component will initiate GoogleMapMap object and load
 * the GoogleAPI
 */
class MapChart extends Component {
  constructor(props) {
    super(props);
    this.googleMapDom_ = null;

    this.state = {
      loaded: false,
      map: null,
    }
  }

  /**
   * Load Googles Map API into the DOM with the API key
   * @param {object} callback Callback function
   */
  _loadGoogleAPI = (callback) => {
    const existingScript = document.getElementById('googleMaps');
    
    if (!existingScript) {
      const script = document.createElement('script');
      // FIXME: The API Key is visible in the dom by doing this.
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
      script.id = 'googleMaps';
      document.body.appendChild(script);
  
      script.onload = () => {
        if (callback) callback();
      };
    }
  
    if (existingScript && callback) callback();
  }

  componentDidMount() {
    this._loadGoogleAPI(() => {
      const gMap = new window.google.maps.Map(this.googleMapDom_, {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8,
      });

      this.setState({
        loaded: true,
        map: gMap,
      })
    })
  }

  /**
   * [Callback ref](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs), 
   * don't pass anything to this function, react will handle this internally
   */
  _registerChild = (ref) => {
    this.googleMapDom_ = ref;
  };

  render() {

    return (
      <div className="MapChart">
        {!this.state.loaded && <em>Loading...</em>}
        <GoogleMapMap registerChild={this._registerChild} />
      </div>
    );
  }
}

export default MapChart;
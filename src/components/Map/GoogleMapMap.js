import React, { Component } from 'react';

/**
 * Compontent that stores the *Map* variable of GoogleMap.
 * This can't be handeld as a normal reactDOM because of how
 * the GoogleAPI works.
 */
class GoogleMapMap extends Component {
  constructor(props) {
    super(props);

    // Need inline style to overide google libary
    this.style = {
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      margin: 0,
      padding: 0,
      position: 'absolute',
      zIndex: -1,
    };
  }

  shouldComponentUpdate() {
    return false; // disable react on this div
  }

  render() {
    const { registerChild } = this.props;
    return <div 
      className="GoogleMapMap" 
      ref={registerChild} 
      style={this.style}
    />;
  }
}

export default GoogleMapMap;
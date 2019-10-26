import React from 'react';
import ReactDOM from 'react-dom';
import MapChart from './Map.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MapChart />, div);
  ReactDOM.unmountComponentAtNode(div);
});
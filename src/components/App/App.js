import React from 'react';
import { Route } from 'react-router-dom';

import Landing from '../Landing/Landing.js';
import './App.css';
 

const App = () => {
  return (
    <div className="App">
    
    <Route exact path="/" component={Landing} />

    </div>
  );
}

export default App;

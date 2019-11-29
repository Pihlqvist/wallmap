import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App/App.js';
import Firebase, { FirebaseContext } from "./components/Firebase";

import './index.css';
import "./styles/Buttons.css";
import "./styles/Input.css";
import "./styles/Form.css";
import "./styles/Links.css";

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </FirebaseContext.Provider>, document.getElementById('root'));

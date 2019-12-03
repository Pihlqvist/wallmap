import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../data/constants/routes.js";

import "./Landing.css";

const Landing = () => {
  return (
    <div className="LandingContainer">
      <div className="Landing">
        <h1 className="Tagline">Visualize all your travels on WallMap</h1>
        <div className="BtnSignUp LinkBtn1">
          <Link to={ROUTES.SIGN_UP}>Get Started Now</Link>
        </div>
        <div className="LandingTextArea">
          <div className="TextBox">
            <h3>No more need for a paper wall map</h3>
            <p>With WallMap you don't need any longer to buy an expensive paper map to hang on the wall and then buy pins to pin every place you have travelled to. You can do it all digitally in WallMap, and very easily. </p>
          </div>
          <div className="TextBox">
            <h3>Save your memories on WallMap</h3>
            <p>With WallMap we help you keep your memories of each place you have travelled to in the world. You can add photos and info to each place you visited. You simply add a pin to your WallMap and then add your images and info.</p>
          </div>
        </div>
      </div>

      <div className="Background"></div>
    </div>
  );
};
export default Landing;



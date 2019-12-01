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
      </div>

      <div className="Background"></div>
    </div>
  );
};
export default Landing;

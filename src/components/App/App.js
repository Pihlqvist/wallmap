import React from "react";
import { Route } from "react-router-dom";

import * as ROUTES from "../../data/constants/routes.js";

import Landing from "../Landing/Landing.js";
import About from "../About/About.js";
import "./App.css";
import SignUp from "../SignUp/SignUp.js";
import Login from "../Login/Login.js";
import Profile from "../Profile/Profile.js";
import Places from "../Places/Places.js";
import ForgotPassword from "../ForgotPassword/ForgotPassword.js";
import Navigation from "../Navigation/Navigation.js";
import { ProvideAuth } from "../Session/UserAuth.js";
import { PrivateRoute } from "../PrivateRoute/PrivateRoute.js";

const App = () => {
  return (
    <ProvideAuth>
      <div className="App">
        <Navigation />

        <Route exact path={ROUTES.LANDING} component={Landing} />
        <Route exact path={ROUTES.ABOUT} component={About} />
        <Route exact path={ROUTES.SIGN_UP} component={SignUp} />
        <Route exact path={ROUTES.LOGIN} component={Login} />
        <Route exact path={ROUTES.PROFILE} component={Profile} />
        <Route exact path={ROUTES.PLACES} component={Places} />
        <Route exact path={ROUTES.FORGOT_PASSWORD} component={ForgotPassword} />

      </div>
    </ProvideAuth>
  );
};

export default App;

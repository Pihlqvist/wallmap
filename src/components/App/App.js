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
import { PrivateRoute } from "../Route/PrivateRoute.js";
import { AuthorizedRoute } from "../Route/AuthorizedRoute.js";


const App = () => {
  return (
    <ProvideAuth>
      <div className="App">
        <Navigation />

        <AuthorizedRoute exact path={ROUTES.LANDING} component={Landing} />
        <Route exact path={ROUTES.ABOUT} component={About} />
        <AuthorizedRoute exact path={ROUTES.SIGN_UP} component={SignUp} />
        <AuthorizedRoute exact path={ROUTES.LOGIN} component={Login} />
        <PrivateRoute exact path={ROUTES.PROFILE} component={Profile} />
        <PrivateRoute exact path={ROUTES.PLACES} component={Places} />
        <AuthorizedRoute exact path={ROUTES.FORGOT_PASSWORD} component={ForgotPassword} />

      </div>
    </ProvideAuth>
  );
};

export default App;

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../util/UserAuth";

import * as ROUTES from "../../data/constants/routes.js";

/**
 * A wrapper for <Route> that redirects to the login
 * screen if you're not yet authenticated.
 */
const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useAuth();

  return auth.done ? (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={props =>
        auth.user ? <Component {...props} /> : <Redirect to={ROUTES.LOGIN} />
      }
    />
  ) : null;
};

export { PrivateRoute };

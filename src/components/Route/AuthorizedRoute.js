import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../util/UserAuth";

import * as ROUTES from "../../data/constants/routes.js";

/**
 * A wrapper for <Route> that redirects the user to places
 * if the user is logged in.
 */
const AuthorizedRoute = ({ component: Component, ...rest }) => {
  const auth = useAuth();

  console.log("AuthorizedRoute auth: ", auth);

  return auth.done ? (
    // Show the component only when a user does not exist
    // Otherwise, redirect the user to places
    <Route
      {...rest}
      render={props =>
        auth.user ? <Redirect to={ROUTES.PLACES} /> : <Component {...props} />
      }
    />
  ) : null;
};

export { AuthorizedRoute };

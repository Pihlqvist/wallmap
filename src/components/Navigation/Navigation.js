import React, {Component} from 'react';
import {Link, useLocation} from 'react-router-dom';
import * as ROUTES from '../../data/constants/routes.js';
import { useAuth } from "../Session/UserAuth.js";
import { LogOutButton } from "../Logout/Logout.js";

import './Navigation.css';

const Navigation = () => {
  const auth = useAuth();
  const location = useLocation();

  const shouldDisplay = location.pathname !== ROUTES.PLACES;

	return shouldDisplay ? (
    <div className="Navigation">
      {auth.user ? (
        <LeftNavAuth />
      ) : (
        <LeftNavNonAuth />
      )}
      {auth.user ? (
        <RightNavAuth authUser={auth.user}/>
      ) : (
        <RightNavNonAuth />
      )}
    </div>
  ) : null;
}

const LeftNavNonAuth = () => {
  return (
    <div className="LeftNav">
      <ul>
        <li className="Wallmap">
        <Link to={ROUTES.LANDING} style={{ color: '#EEEEEE' }}>WallMap</Link>
        </li>
      </ul>
    </div>
  )
}

const LeftNavAuth = () => {
  return (
    <div className="LeftNav">
      <ul>
        <li>
        <Link to={ROUTES.LANDING} style={{ color: '#EEEEEE' }}>WallMap</Link>
        </li>
        <li>
          <Link to={ROUTES.PLACES} style={{ color: '#EEEEEE' }}>Places</Link>
        </li>
      </ul>
    </div>
  )
}

const RightNavAuth = ({ authUser }) => {
  return (
    <div className="RightNav">
      <ul>
        <li>
          {authUser.email}
        </li>
        <li>
          <LogOutButton />
        </li>
      </ul>
    </div>
  )
}

const RightNavNonAuth = () => {
  return (
    <div className="RightNav">
      <ul>
        <li className="Login">
          <Link to={ROUTES.LOGIN} style={{ color: '#EEEEEE' }}>Login</Link>
        </li>
        <span className="Rectangle">
          <li className="SignUp">
            <Link to={ROUTES.SIGN_UP} style={{ color: '#EEEEEE' }}>Sign Up</Link>
          </li>
        </span>
      </ul>
    </div>
  )
}

export default Navigation;
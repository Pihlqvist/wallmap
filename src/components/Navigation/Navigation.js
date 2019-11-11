import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as ROUTES from '../../data/constants/routes.js';
import { useAuth } from "../Session/UserAuth.js";
import { LogOutButton } from "../Logout/Logout.js";

import './Navigation.css';

const Navigation = () => {
  const auth = useAuth();
	return (
    <div className="Navigation">
      <LeftNav />
      {auth.user ? (
        <RightNavAuth authUser={auth.user}/>
      ) : (
        <RightNavNonAuth />
      )}
    </div>
  )
}

const LeftNav = () => {
  return (
    <div className="LeftNav">
      <ul>
        <li>
        <Link to={ROUTES.LANDING}>WallMap</Link>
        </li>
        <li>
          <Link to={ROUTES.ABOUT}>About</Link>
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
        <li>
          <Link to={ROUTES.LOGIN}>Login</Link>
        </li>
        <li>
          <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
        </li>
      </ul>
    </div>
  )
}

export default Navigation;
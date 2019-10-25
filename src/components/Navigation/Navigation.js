import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as ROUTES from '../../data/constants/routes.js';

import './Navigation.css';

const Navigation = () => {
	return (
			<div className="Navigation">
				<LeftNav />
        <RightNav />
			</div>
		)
}
export default Navigation;

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

const RightNav = () => {
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
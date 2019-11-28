import React, {Component} from 'react';
import {Link, useLocation} from 'react-router-dom';
import * as ROUTES from '../../data/constants/routes.js';

import './Landing.css';

const Landing = () => {
	return (
			<div className="Landing">
				<div className="LdBackgrImg"></div>
				<h1 className="Tagline" style={{color:'#EEEEEE'}}>Visualize all your travels on WallMap</h1>
				<div className="BtnSignUp"><Link to={ROUTES.SIGN_UP} style={{ color: '#EEEEEE' }}>Get Started Now</Link></div>
			</div>
		)
}
export default Landing;
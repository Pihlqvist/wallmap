import React from 'react';
import {useHistory} from 'react-router-dom';
import * as ROUTES from "../../data/constants/routes.js";

import "./Landing.css";

const Landing = () => {
	const history = useHistory();

	return (
			<div className="Landing">
				<h1>Welcome to WallMap</h1>
				<button onClick={() => history.push(ROUTES.LOGIN)}>Login</button>
				<button onClick={() => history.push(ROUTES.SIGN_UP)}>Sign Up</button>
			</div>
		)
}

export default Landing;
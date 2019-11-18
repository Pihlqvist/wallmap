import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../data/constants/routes.js';

const ForgotPassword = () => {
	return (
			<div className="ForgotPassword">
				<h1>This is ForgotPassword Page</h1>
			</div>
		)
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.FORGOT_PASSWORD}>Forgot Password?</Link>
  </p>
);

export default ForgotPassword;

export { PasswordForgetLink };
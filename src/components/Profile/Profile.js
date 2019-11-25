import React, { useState } from 'react';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import { LogOutButton } from "../Logout/Logout";
import { useAuth } from '../Session/UserAuth';

import "./Profile.css";

const Profile = () => {
	return (
		<div className="Profile">
			<h2>Profile Page</h2>
		</div>
	)
}

const ProfileMenu = () => {
	const auth = useAuth();

	return (
		<div className="Popper">
			<p>{auth.user.email}</p>
			<LogOutButton />
		</div>
	)
}

const ProfileBtn = () => {
	const [display, setDisplay] = useState(false);

	return (
		<div className="MapBtnAreaRight">
			<Fab className="ProfileBtn MapBtn" onClick={() => setDisplay(!display)}>
				<Icon>person</Icon>
			</Fab>
			{display && <ProfileMenu />}
		</div>
	);
}

export default Profile;

export { ProfileBtn }
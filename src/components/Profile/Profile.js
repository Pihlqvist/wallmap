import React, { useState } from 'react';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import { useFirebase } from '../Firebase';

import "./Profile.css";

const Profile = () => {
	return (
		<div className="Profile">
			<h2>Profile Page</h2>
		</div>
	)
}

const ProfileMenu = () => {
	const firebase = useFirebase();

	return (
		<div className="Popper">
			<ul className="MenuList">
				<li className="MenuListItem">Profile</li>
				<li 
					className="MenuListItem" 
					onClick={firebase.doSignOut}
					style={{color: "rgb(143, 57, 65)"}}
					>
						Logout
					</li>
			</ul>
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
import React, { useState, useEffect } from "react";
import Fab from "@material-ui/core/Fab";
import Icon from "@material-ui/core/Icon";
import { useFirebase } from "../../util/Firebase";
import { useAuth } from "../../util/UserAuth";

import "./Profile.css";

const Profile = () => {
  return (
    <div className="Profile">
      <h2>Profile</h2>
      <ProfileForm />
    </div>
  );
};

const ProfileForm = () => {
  const user = useAuth().user;

  const [username, setUsername] = useState(user.displayName);
  // const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [messageName, setMessageName] = useState(null);
  const [messagePass, setMessagePass] = useState(null);
  // const [messageEmail, setMessageEmail] = useState(null);

  const firebase = useFirebase();

  const onSubmit = evt => {
    evt.preventDefault();

    if (username !== user.displayName) {
      firebase
        .doDisplayNameUpdate(username)
        .then(() => {
          setMessageName("Username Updated!");
          setError(null);
        })
        .catch(error => setError(error));
    }
    // if (email !== user.email) {
    //   // Change password
    //   firebase.doEmailUpdate(email)
    //   .then(() => {
    //     setMessageEmail("Email Updated!");
    //     setError(null);
    //   })
    //   .catch(error => setError(error));
    // }
    if (typeof password === "string") {
      // Change password
      firebase
        .doPasswordUpdate(password)
        .then(() => {
          setMessagePass("Password Updated!");
          setError(null);
        })
        .catch(error => setError(error));
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <label for={"username"}>Username</label>
      <input
        className="InputField1"
        name="username"
        value={username}
        required
        onChange={evt => setUsername(evt.target.value)}
        type="text"
        placeholder="Username"
      />
      {/* <input
        className="InputField1"
        name="email"
        value={email}
        required
        onChange={evt => setEmail(evt.target.value)}
        type="email"
        placeholder="Email"
      /> */}
      <label for={"password"}>Password</label>
      <input
        className="InputField1"
        name="password"
        value={password}
        onChange={evt => setPassword(evt.target.value)}
        type="password"
        placeholder="Password"
      />
      <div className="ProfileSubmitBtnContainer">
        <button disabled={false} type="submit" className="Btn1">
          Save Changes
        </button>
      </div>
      {messageName && <p>{messageName}</p>}
      {/* {messageEmail && <p>{messageEmail}</p>} */}
      {messagePass && <p>{messagePass}</p>}
      {error && <p>{error.message}</p>}
    </form>
  );
};

const ProfileMenu = ({ handleProfileClick, setDisplay }) => {
  const firebase = useFirebase();

  // Closes the suggestion search if we click outside it's context
  useEffect(() => {
    const onClickOutside = evt => {
      setTimeout(() => setDisplay(false), 10);
    };

    document.body.addEventListener("click", onClickOutside, false);
    return () => document.body.removeEventListener("click", onClickOutside);
  }, []);

  return (
    <div className="Popper">
      <ul className="MenuList">
        <li className="MenuListItem" onClick={handleProfileClick}>
          Profile
        </li>
        <li
          className="MenuListItem MenuListItemLogin"
          onClick={firebase.doSignOut}
        >
          Logout
        </li>
      </ul>
    </div>
  );
};

const ProfileBtn = ({ handleProfileClick }) => {
  const [display, setDisplay] = useState(false);

  return (
    <div className="MapBtnAreaRight">
      <Fab className="ProfileBtn MapBtn" onClick={() => setDisplay(!display)}>
        <Icon>person</Icon>
      </Fab>
      {display && (
        <ProfileMenu
          handleProfileClick={handleProfileClick}
          setDisplay={setDisplay}
        />
      )}
    </div>
  );
};

export default Profile;

export { ProfileBtn };

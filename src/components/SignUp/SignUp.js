import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFirebase } from "../Firebase";
import { useHistory } from "react-router-dom";

import * as ROUTES from "../../data/constants/routes";

import "./SignUp.css";

const SignUp = () => {
  return (
    <div className="SignUpContainer">
      <h1>SignUp</h1>
      <SignUpForm />
    </div>
  );
};

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null
};

const SignUpForm = () => {
  const [username, setUsername] = useState(INITIAL_STATE.username);
  const [email, setEmail] = useState(INITIAL_STATE.email);
  const [passwordOne, setPasswordOne] = useState(INITIAL_STATE.passwordOne);
  const [passwordTwo, setPasswordTwo] = useState(INITIAL_STATE.passwordTwo);
  const [error, setError] = useState(INITIAL_STATE.error);

  const firebase = useFirebase();
  const history = useHistory();

  const onSubmit = evt => {
    evt.preventDefault();

    firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return firebase.user(authUser.user.uid).set({
          username,
          email,
          place: "",
        });
      })
      .then(() => {
				// TODO: Find a better way to init all the states
				setUsername(INITIAL_STATE.username);
				setEmail(INITIAL_STATE.email);
				setPasswordOne(INITIAL_STATE.passwordOne);
				setPasswordTwo(INITIAL_STATE.passwordTwo);
				setError(INITIAL_STATE.error);
        history.push(ROUTES.PLACES);
      })
      .catch(error => {
        setError(error);
      });
  };

  const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === "" ||
    email === "" ||
    username === "";

  return (
    <form onSubmit={onSubmit}>
      <div>
      <input
        name="username"
        value={username}
        onChange={evt => setUsername(evt.target.value)}
        type="text"
        placeholder="Full Name"
      />
      </div>
      <div>
      <input
        name="email"
        value={email}
        onChange={evt => setEmail(evt.target.value)}
        type="text"
        placeholder="Email Address"
      />
      </div>
      <div>
      <input
        name="passwordOne"
        value={passwordOne}
        onChange={evt => setPasswordOne(evt.target.value)}
        type="password"
        placeholder="Password"
      />
      </div>
      <div>
      <input
        name="passwordTwo"
        value={passwordTwo}
        onChange={evt => setPasswordTwo(evt.target.value)}
        type="password"
        placeholder="Confirm Password"
      />
      </div>
      <button disabled={isInvalid} type="submit">
        Sign Up
      </button>
      {error && <p>{error.message}</p>}
    </form>
  );
};

const SignUpLink = () => {
  return (
    <p>
      Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
  );
};

export default SignUp;

export { SignUpForm, SignUpLink };



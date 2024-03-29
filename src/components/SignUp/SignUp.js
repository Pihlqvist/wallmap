import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFirebase } from "../../util/Firebase";
import { useHistory } from "react-router-dom";

import * as ROUTES from "../../data/constants/routes";

import "./SignUp.css";

const SignUp = () => {
  return (
    <div className="FormContainer1">
      <h1>SignUp</h1>
      <SignUpForm />
      <div className="Background"></div>
    </div>
  );
};

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [error, setError] = useState(null);

  const firebase = useFirebase();
  const history = useHistory();

  const onSubmit = evt => {
    evt.preventDefault();

    firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Add additional infromation the the users profile
        authUser.user.updateProfile({ displayName: username });

        // Create a user in your Firebase realtime database
        return firebase.user(authUser.user.uid).set({
          username,
          email,
          place: ""
        });
      })
      .then(() => {
        setUsername("");
        setEmail("");
        setPasswordOne("");
        setPasswordTwo("");
        setError(null);
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
      <input
        className="InputField1"
        name="username"
        value={username}
        required
        onChange={evt => setUsername(evt.target.value)}
        type="text"
        placeholder="Username *"
      />
      <input
        className="InputField1"
        name="email"
        value={email}
        onChange={evt => setEmail(evt.target.value)}
        type="text"
        placeholder="Email Address *"
      />
      <input
        className="InputField1"
        name="passwordOne"
        value={passwordOne}
        onChange={evt => setPasswordOne(evt.target.value)}
        type="password"
        placeholder="Password *"
      />
      <input
        className="InputField1"
        name="passwordTwo"
        value={passwordTwo}
        onChange={evt => setPasswordTwo(evt.target.value)}
        type="password"
        placeholder="Confirm Password *"
      />
      <button disabled={isInvalid} type="submit" className="Btn1">
        Sign Up
      </button>
      {error && <p>{error.message}</p>}
    </form>
  );
};

const SignUpLink = () => {
  return (
    <p className="SignUpLinkPara">
      Don't have an account?{" "}
      <Link to={ROUTES.SIGN_UP} className="AllwaysBlueLinks">
        Sign Up
      </Link>
    </p>
  );
};

export default SignUp;

export { SignUpForm, SignUpLink };

import React, { useState, useContext } from "react";
import * as ROUTES from "../../data/constants/routes.js";
import { FirebaseContext } from "../Firebase/index.js";
import { useHistory, useLocation } from "react-router-dom";
import { SignUpLink } from "../SignUp/SignUp.js";
import { PasswordForgetLink } from "../ForgotPassword/ForgotPassword.js";

import "./Login.css";

const Login = () => {
  return (
    <div className="FormContainer1">
      <h1>Login</h1>
      <LoginForm />
      <div className="LinkRow">
        <PasswordForgetLink />
        <SignUpLink />
      </div>
    </div>
  );
};

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

const LoginFormBase = () => {
  const [email, setEmail] = useState(INITIAL_STATE.email);
  const [password, setPassword] = useState(INITIAL_STATE.password);
  const [error, setError] = useState(INITIAL_STATE.error);

  const firebase = useContext(FirebaseContext);
  const history = useHistory();

  const onSubmit = evt => {
    evt.preventDefault();

    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setEmail(INITIAL_STATE.email);
        setPassword(INITIAL_STATE.password);
        setError(INITIAL_STATE.error);
        // TODO: If we where redirected, push to the redirect
        history.push(ROUTES.PLACES);
      })
      .catch(error => {
        setError(error);
      });
  };

  const isInvalid = password === "" || email === "";

  return (
    <form onSubmit={onSubmit}>
      <input
        className="InputField1"
        name="email"
        value={email}
        onChange={evt => setEmail(evt.target.value)}
        type="text"
        placeholder="Email Address *"
        autoComplete="current-email"
      />
      <input
        className="InputField1"
        name="password"
        value={password}
        onChange={evt => setPassword(evt.target.value)}
        type="password"
        placeholder="Password *"
        autoComplete="current-password"
      />
      <button disabled={isInvalid} type="submit" className="Btn1 LoginBtn">
        Login
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
};

const LoginForm = LoginFormBase;

export default Login;

export { LoginForm };
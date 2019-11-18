import React, { useState, useContext } from "react";
import * as ROUTES from "../../data/constants/routes.js";
import { FirebaseContext } from "../Firebase/index.js";
import { useHistory, useLocation } from "react-router-dom";
import { SignUpLink } from "../SignUp/SignUp.js";
import { PasswordForgetLink } from "../ForgotPassword/ForgotPassword.js";
import { useAuth } from "../Session/UserAuth.js";

import "./Login.css";


const Login = () => {

  return (
    <div className="LoginContainer">
      <h1>Login</h1>
      <LoginForm />
      <PasswordForgetLink />
      <SignUpLink />
    </div>
  )
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
      <Row lable="email">
        <input
          name="email"
          value={email}
          onChange={evt => setEmail(evt.target.value)}
          type="text"
          placeholder="Email Address"
        />
      </Row>
      <Row lable="password">
        <input
          name="password"
          value={password}
          onChange={evt => setPassword(evt.target.value)}
          type="password"
          placeholder="Password"
        />
      </Row>
      <button disabled={isInvalid} type="submit">
        Sign In
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
};

const LoginForm = LoginFormBase;

export default Login;

export { LoginForm };

const Row = props => (
  <div className="Row">
    <span className="rowTitle">{props.label}</span>
    <span className="rowContent">{props.children}</span>
  </div>
);
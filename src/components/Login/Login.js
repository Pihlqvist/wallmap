import React, { useState } from "react";
import * as ROUTES from "../../data/constants/routes.js";
import { useFirebase } from "../../util/Firebase";
import { useHistory } from "react-router-dom";
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
      <div className="Background"></div>
    </div>
  );
};

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const firebase = useFirebase();
  const history = useHistory();

  const onSubmit = evt => {
    evt.preventDefault();

    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setEmail("");
        setPassword("");
        setError(null);
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

export default Login;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../data/constants/routes.js";
import { useFirebase } from "../../util/Firebase";

const ForgotPassword = () => {
  return (
    <div className="FormContainer1">
      <h1>Forgot Password</h1>
      <PasswordForgetForm />
      <div className="Background"></div>
    </div>
  );
};

const PasswordForgetForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const firebase = useFirebase();

  const onSubmit = evt => {
    evt.preventDefault();

    firebase
      .doPasswordReset(email)
      .then(() => {
        setEmail("");
        setError(null);
      })
      .catch(error => {
        setError(error);
      });
  };

  const isInvalid = email === "";

  return (
    <form onSubmit={onSubmit}>
      <input
        name="email"
        value={email}
        onChange={evt => setEmail(evt.target.value)}
        type="text"
        placeholder="Email Address"
        className="InputField1"
      />
      <button disabled={isInvalid} type="submit" className="Btn1">
        Reset My Password
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
};

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.FORGOT_PASSWORD} className="AllwaysBlueLinks">
      Forgot Password?
    </Link>
  </p>
);

export default ForgotPassword;

export { PasswordForgetLink };

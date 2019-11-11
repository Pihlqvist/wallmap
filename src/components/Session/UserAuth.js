import React, { useState, useEffect, useContext } from "react";
import { useFirebase } from "../Firebase/index.js";

const AuthUserContext = React.createContext(null);

/**
 * Provider component that wraps your app and makes auth object 
 * available to any child component that calls useAuth()
 */
export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return (
    <AuthUserContext.Provider value={auth}>
      {children}
    </AuthUserContext.Provider>
  );
}

/**
 * Hook for child components to get the auth object
 * and re-render when it changes.
 * @return {Object} AuthUserContext
 */
export const useAuth = () => {
  return useContext(AuthUserContext);
};

/**
 * Provider hook that creates auth object and handles state
 * @return {Object} auth object
 */
const useProvideAuth = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
  const firebase = useFirebase();

  /**
   * Subscribe to user on mount
   * Because this sets state in the callback it will cause any
   * component that utilizes this hook to re-render with the
   * latest auth object.
   */
  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        setUser(authUser);
      }
      else {
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [firebase.auth]);

  // Return the user object
  return (
    {user: user}
  );
}
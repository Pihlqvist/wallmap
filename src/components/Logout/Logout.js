import React from 'react';
import { useFirebase } from '../Firebase';

const LogOutButton = () => {
  const firebase = useFirebase();
  return (
    <button type="button" onClick={firebase.doSignOut} className="Btn1">
      Sign Out
    </button>
  );
};

export { LogOutButton };
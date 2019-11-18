import FirebaseContext from './context';
import Firebase from './firebase';
import React, {useContext} from 'react';

export default Firebase;

/**
 * React Hook that uses `FirebaseContext` to access
 * the `Firebase` class.
 * @return {Firebase} Firebase Context
 */
const useFirebase = () => {
  return useContext(FirebaseContext);
}

export { FirebaseContext, useFirebase };
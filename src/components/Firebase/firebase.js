import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

/**
 * Firebase instance class, used as a middle API between Firebase 
 * and the rest of the program.
 */
class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
    this.storage = app.storage();
  }


  /*** Auth API ***/

  /**
   * Creates a user with firebase
   * @param {string} email user email
   * @param {string} password user password
   */
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  /**
   * Sign in a user
   * @param {string} email user email
   * @param {string} password user password
   */    
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  /**
   * Sign out current active user
   */
  doSignOut = () => this.auth.signOut();

  /**
   * Send password reset to a users email
   * @param {string} email user email
   */    
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  /**
   * Update the current active user's password with the given one
   * @param {string} password user password
   */   
  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  
  // *** User API ***

  /**
   * Get referance to the database of a specific user id
   */   
  user = uid => this.db.ref(`users/${uid}`);

  /**
   * Get a referance to all the users in the database
   */   
  users = () => this.db.ref('users');


  /*** Place API ***/

  /**
   * Get a referance to a users place objects
   */   
  place = (uid) => this.db.ref(`users/${uid}/place`);


  /*** STORAGE ***/
  
  images = (uid, ref) => this.storage.ref(`images/${uid}/${ref}`);
}

export default Firebase;
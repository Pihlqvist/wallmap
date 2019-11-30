import react, { useState, useEffect } from "react";
import { useAuth } from "../../util/UserAuth";
import { useFirebase } from "../../util/Firebase";

/**
 * Place hook, gives the users places in a format that is
 * expected by the rest of the app.
 */
const usePlaces = () => {
  const [places, setPlaces] = useState(null);

  const auth = useAuth();
  const firebase = useFirebase();

  // Get user place from fierbase
  useEffect(() => {
    if (auth.user) {
      firebase.place(auth.user.uid).on("value", snapshot => {
        if (snapshot.val()) {
          setPlaces(convert(snapshot));
        }
      });
    } else {
      setPlaces([]);
    }
  }, [auth, firebase]);

  /**
   * Given a Firebase snapshot of place it returns an array of
   * place objects that the webapp can work with.
   * @param {Object} snapshot snapshot from firebase
   * @return {Array} List of place objects
   */
  const convert = snapshot => {
    let keys = Object.keys(snapshot.val());
    let firebasePlaces = Object.values(snapshot.val());
    firebasePlaces.forEach((place, idx) => {
      place.id = keys[idx]; // Add key as object id
      place.date = new Date(place.date); // Convert date to object
    });
    return firebasePlaces;
  };

  return places;
};

export { usePlaces };

import React, { useState, useEffect } from "react";
import * as opencage from "opencage-api-client";
import { useFirebase } from "../Firebase";
import { useAuth } from "../Session/UserAuth";

import "./AddPlace.css";

const AddPlace = ({ hide, preLocation }) => (
  <div className="FormContainer1">
    <h1 className="AddPlaceTitle">Add a new place</h1>
    <AddPlaceForm hide={hide} preLocation={preLocation}/>
  </div>
)

const AddPlaceForm = ({ hide, preLocation }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState(null); // FileList
  const [suggestions, setSuggestions] = useState([]);

  const auth = useAuth();
  const firebase = useFirebase();
  const debouncedSearchTerm = useDebounce(location, 500);

  // Set suggestions when debounce returns a value
  useEffect(() => {
    if (debouncedSearchTerm) {
      // Fire off our API call
      searchSuggestion(debouncedSearchTerm).then(results => {
        setSuggestions(results);
      });
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearchTerm]);

  // Calls API with query and returns results
  const searchSuggestion = query => {
    return opencage
      .geocode({ key: process.env.REACT_APP_OCD_API_KEY, q: query })
      .then(response => response.results)
      .then(results => {
        if (results) {
          return results;
        } else {
          console.log("no results");
          return [];
        }
      })
      .catch(error => {
        console.error(error);
        return [];
      });
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    // If we have the coordinates, create the place
    if (suggestions[0]) {
      const refKey = firebase.place(auth.user.uid).push({
        name,
        location: suggestions[0],
        date: Date(date),
        description,
        image: ""
      });

      // Upload images to the place if we have any
      if (images) {
        Array.from(images).forEach(img => {
          firebase
            .images(auth.user.uid, refKey.path.pieces_[3])
            .child(img.name)
            .put(img);
        });
      }

      // Hide the AddPlace component
      hide();
    } else {
      // We din't get a good result from API
      alert("Plz specify another location");
    }
  };

  // Geocode the coordinates from MapBox into formatted location
  useEffect(() => {
    if (preLocation) {
      const query = `${preLocation[1]},${preLocation[0]}`;
      opencage
        .geocode({ q: query, key: process.env.REACT_APP_OCD_API_KEY })
        .then(data => {
          if (data.status.code == 200 && data.results.length > 0) {
            setLocation(data.results[0].formatted);
          }
        })
        .catch(error => {
          console.log("error", error.message);
        });
    }
  }, []);

  // Can't submit a place if these properties are not met
  const isInvalid = name === "" || location === "";

  return (
    <form className="AddPlace" onSubmit={handleSubmit}>
      <Row label="Name:">
        <input 
          value={name} 
          onChange={evt => setName(evt.target.value)} 
          className="InputField1"
          placeholder="Name of the place"
        />
      </Row>
      <Row label="Location:">
        <input
          value={location}
          list="datalist"
          onChange={evt => setLocation(evt.target.value)}
          className="InputField1"
          placeholder="City, country or address"
        />
        <datalist id="datalist">
          {suggestions.map((value, idx) => (
            <option
              key={idx}
              value={value.formatted}
              onClick={() => console.log("lciK")}
            />
          ))}
        </datalist>
      </Row>
      <Row label="Date:">
        <input
          value={date}
          type="date"
          onChange={evt => setDate(evt.target.value)}
          className="InputField1"
        />
      </Row>
      <Row label="Description">
        <textarea
          name="description"
          rows="10"
          value={description}
          onChange={evt => setDescription(evt.target.value)}
          className="InputField1"
          placeholder="Here you can describe the place or your experience of the place you visited"
        />
      </Row>
      <Row label="Image (Images)">
        <input
          type="file"
          multiple
          accept="image/png, image/jpeg"
          onChange={evt => setImages(evt.target.files)}
          className="BtnFile"
        />
      </Row>
      <Row>
        <input type="submit" className="Btn1"/>
      </Row>
    </form>
  );
};

const Row = props => (
  <div className="Row">
    <span className="rowTitle">{props.label}</span>
    <span className="rowContent">{props.children}</span>
  </div>
);

/**
 * Debounce Hook, returns value after a delay
 * @param {string} value
 * @param {number} delay
 */
function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set debouncedValue to value (passed in) after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value]);

  return debouncedValue;
}

export default AddPlace;

export { useDebounce };

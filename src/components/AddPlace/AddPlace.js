import React, { useState, useEffect } from "react";
import * as opencage from 'opencage-api-client';
import { useFirebase } from "../Firebase";
import { useAuth } from "../Session/UserAuth";

import "./AddPlace.css";

const AddPlace = ({hide}) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
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
  }, [debouncedSearchTerm])

  // Calls API with query and returns results
  const searchSuggestion = (query) => {
    return opencage
    .geocode({key: process.env.REACT_APP_OCD_API_KEY, q: query})
    .then(response => response.results)
    .then(results => {
      if(results) {
        return results;
      }
      else {
        console.log("no results");
        return [];
      }
    })
    .catch(error =>{
      console.error(error);
      return [];
    });
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (suggestions) {
      const refKey = firebase.place(auth.user.uid).push(
        {
          name,
          location: suggestions[0],
          date: Date(date),
          description,
          image: "",
        }
      );
      if (image) {
        const ref = firebase.images(auth.user.uid, refKey.path.pieces_[3]).child(image.name);
        ref.put(image).then((snapshot) => {
          console.log("uploaded image");
        });
      }
      hide();
    }
    else {  // We din't get a good result from API
      alert("Plz specify another location");
    }
  };

  // Can't submit a place if these properties are not met
  const isInvalid = name === "" ||
    location === "";

  return (
    <form className="AddPlace" onSubmit={handleSubmit}>
      <Row label="Name:">
				<input 
					value={name} 
					onChange={evt => setName(evt.target.value)}
				/>
      </Row>
      <Row label="Location:">
        <input 
          value={location} 
          list="datalist"
          onChange={ evt => setLocation(evt.target.value)} 
        />
        <datalist id="datalist">
          {suggestions.map((value, idx) => <option key={idx} value={value.formatted} onClick={() => console.log("lciK")}/>)}
        </datalist>
      </Row>
      <Row label="Date:">
				<input 
					value={date} 
					type="date" 
					onChange={evt => setDate(evt.target.value)} 
				/>
      </Row>
      <Row label="Description">
				<input 
					value={description} 
					onChange={evt => setDescription(evt.target.value)} 
				/>
      </Row>
      <Row label="Image (Images)">
				<input 
					type="file" 
					onChange={evt => setImage(evt.target.files[0])} 
				/>
      </Row>
      <Row>
				<input type="submit" />
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
  },[value]);

  return debouncedValue;
}

export default AddPlace;

export { useDebounce }
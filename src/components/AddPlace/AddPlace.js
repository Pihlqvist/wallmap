import React, { useState, useEffect, useRef, useCallback } from "react";
import * as opencage from "opencage-api-client";
import { useFirebase } from "../../util/Firebase";
import { useAuth } from "../../util/UserAuth";
import { useDebounce } from "../../util/Debounce";
import { ImageDropzone } from "../Dropzone/Dropzone";
import SuggestionInputField from "../SuggestionInput/SuggestionInput";

import "./AddPlace.css";

const AddPlace = ({ hide, preLocation }) => (
  <div className="AddPlaceFormContainer">
    <h1 className="AddPlaceTitle">Add a new place</h1>
    <AddPlaceForm hide={hide} preLocation={preLocation} />
  </div>
);

const AddPlaceForm = ({ hide, preLocation }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState(null); // FileList
  const [suggestions, setSuggestions] = useState([]);
  const [locationData, setLocationData] = useState(null);

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

  // Calls API with query and returns results
  const searchSuggestion = query => {
    return opencage
      .geocode({ key: process.env.REACT_APP_OCD_API_KEY, q: query })
      .then(response => response.results)
      .then(results => {
        if (results) {
          return results;
        } else {
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
    if (locationData) {
      const refKey = firebase.place(auth.user.uid).push({
        name,
        location: locationData,
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

  // Can't submit a place if these properties are not met
  const isInvalid = name === "" || location === "";

  return (
    <form className="AddPlace" onSubmit={handleSubmit}>
      <div className="AddPlaceFormInputs">
        <div className="AddPlaceRight">
          <div className="Row">
            <input
              value={name}
              onChange={evt => setName(evt.target.value)}
              className="InputField1"
              placeholder="Name of the place"
            />
          </div>
          <SuggestionInputField 
            location={location} 
            setLocation={setLocation}
            suggestions={suggestions}
            setLocationData={setLocationData}
          />
          <div className="Row">
            <input
              value={date}
              type="date"
              onChange={evt => setDate(evt.target.value)}
              className="InputField1"
            />
          </div>
          <div className="Row">
            <textarea
              name="description"
              rows="10"
              value={description}
              onChange={evt => setDescription(evt.target.value)}
              className="TextArea1 InputField1"
              placeholder="Here you can describe the place or your experience of the place you visited"
            />
          </div>
        </div>
        <div className="AddPlaceLeft">
          <ImageDropzone setImages={setImages} />
        </div>
      </div>

      <input type="submit" className="Btn1 AddPlaceBtn" disabled={isInvalid} value={"submit"} />
    </form>
  );
};

export default AddPlace;

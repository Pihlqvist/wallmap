import React, { useState, useEffect, useRef } from "react";

import "./SuggestionInput.css";

const SuggestionInputField = ({
  setLocation,
  location,
  suggestions,
  setLocationData
}) => {
  const [focus, setFocus] = useState(-1);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(null);

  const LIST_LENGTH = suggestions.length;

  // Closes the suggestion search if we click outside it's context
  useEffect(() => {
    const onClickOutside = (evt) => {
      if (evt.target.nodeName !== "LI") {
        setDone(true);
        setFocus(-1);
        setError(null);
      }
    }
    const modal = document.body.querySelector(".modal");
    modal.addEventListener("click", onClickOutside, false);
    return () => modal.removeEventListener("click", onClickOutside);
  }, []);

  const handleSelect = location => {
    console.log("location: ", location);
    setLocation(location.formatted);
    setLocationData(location);
    setDone(true);
    setFocus(-1);
    setError(null);
  };
  
  const handleKeyDown = evt => {
    setDone(false);
    switch (evt.key) {
      case "ArrowDown":
        setFocus(focus => (focus + 1) % LIST_LENGTH);
        break;
      case "ArrowUp":
        setFocus(
          focus => (((focus - 1) % LIST_LENGTH) + LIST_LENGTH) % LIST_LENGTH
        );
        break;
      case "Enter":
        // We have not picked from the option list, only user input
        if (focus === -1) {
          // we have `location` as the user input but we are not garatneed to 
          // have anything in suggestion yet  
          setError("Pick a place from the list");
        }
        else if ( 0 < focus < LIST_LENGTH ) {
          setLocation(suggestions[focus].formatted);
          setLocationData(suggestions[focus]);
          setDone(true);
          setError(null);
        }
        else {
          // ERROR `focus` is not in the right bounds.
          console.error("FOCUS is out of bound");
        }
        break;
      default:
        return;
    }
  };

  return (
    <div className="Row">
      <input
        value={location}
        onChange={evt => setLocation(evt.target.value)}
        className="InputField1"
        placeholder="City, country or address"
        onKeyDown={evt => handleKeyDown(evt)}
      />
      {error && <p>{error}</p>}
      {suggestions.length > 0 && !done && (
        <div className="LocationSuggestions">
          <List
            suggestions={suggestions}
            focus={focus}
            setFocus={setFocus}
            handleKeyDown={handleKeyDown}
            handleSelect={handleSelect}
          />
        </div>
      )}
    </div>
  );
};

const List = ({
  suggestions,
  focus,
  setFocus,
  handleKeyDown,
  handleSelect
}) => {
  return (
    <ul onKeyDown={evt => handleKeyDown(evt)} className="SuggestionList">
      {suggestions.map((location, index) => (
        <Item
          key={index}
          setFocus={setFocus}
          index={index}
          focus={focus === index}
          location={location}
          handleKeyDown={handleKeyDown}
          handleSelect={handleSelect}
        />
      ))}
    </ul>
  );
};

const Item = ({ location, focus, handleKeyDown, handleSelect }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (focus) {
      // Move element into view when it is focused
      ref.current.focus();
    }
  }, [focus]);

  return (
    <li
      tabIndex={focus ? 0 : -1}
      role="button"
      ref={ref}
      onClick={() => handleSelect(location)}
      onKeyPress={evt => handleKeyDown(evt)}
    >
      {location.formatted}
    </li>
  );
};

export default SuggestionInputField;

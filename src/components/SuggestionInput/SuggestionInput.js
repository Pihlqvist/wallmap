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

  const LIST_LENGTH = suggestions.length;

  const handleSelect = location => {
    setLocation(location.formatted);
    setLocationData(location);
    setDone(true);
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
        let local;
        if (focus < 0) {
          if (LIST_LENGTH > 0) {
            local = suggestions[focus];
          }
          else {
            return;
          }
        } else {
          local = suggestions[0];
        }
        setLocation(local.formatted);
        setLocationData(local);
        setDone(true);
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

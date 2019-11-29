import react, { useState, useEffect } from "react";

/**
 * Debounce Hook, returns value after a delay
 * @param {string} value
 * @param {number} delay
 */
const useDebounce = (value, delay) => {
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

export { useDebounce };

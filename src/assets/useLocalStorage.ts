// hooks/useLocalStorage.ts
import { useState } from "react";

//TODO
// Add error handling for when localStorage is full?
// Add migration logic for when update data structure?
// Add the undo/redo functionality with localStorage?
// Versioning stored data?

export function useLocalStorage<T>(key: string, initialValue: T) {
  // This function handles the initial loading of data
  const getInitialValue = () => {
    try {
      const item = window.localStorage.getItem(key);
      // Add a console.log to see what we're getting from localStorage
      // console.log("Loading from localStorage:", item);

      // Be more explicit about our fallback to initialValue
      if (item === null) {
        // If nothing in localStorage, use and save our initial value
        window.localStorage.setItem(key, JSON.stringify(initialValue));
        return initialValue;
      }
      return JSON.parse(item);
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return initialValue;
    }
  };

  // Create our state with the initialization function
  const [storedValue, setStoredValue] = useState(getInitialValue);

  // Create a wrapper function for setStoredValue that updates localStorage immediately
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Handle both direct values and updater functions
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      // Update React state
      setStoredValue(valueToStore);

      // Update localStorage immediately
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };

  return [storedValue, setValue] as const;
}

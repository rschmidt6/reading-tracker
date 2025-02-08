// hooks/useLocalStorage.ts
import { useState, useEffect } from "react";

//TODO
// Add error handling for when localStorage is full?
// Add migration logic for when update data structure?
// Add the undo/redo functionality with localStorage?
// Versioning stored data?

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Load state from localStorage
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return initialValue;
    }
  });

  // Add debouncing to prevent rapid localStorage updates
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      try {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
    }, 100); // Wait 100ms before saving to localStorage

    // Cleanup timeout on component unmount or when storedValue changes
    return () => clearTimeout(timeoutId);
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}


// Name: Adeena Akram
// Registration No: 2500605

import { useState } from "react";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const savedValue = localStorage.getItem(key);

    if (savedValue !== null) {
      try {
        return JSON.parse(savedValue);
      } catch {
        return initialValue;
      }
    }

    return initialValue;
  });

  const updateValue = (newValue) => {
    setValue((previousValue) => {
      const updatedValue =
        typeof newValue === "function"
          ? newValue(previousValue)
          : newValue;

      localStorage.setItem(key, JSON.stringify(updatedValue));

      return updatedValue;
    });
  };

  return [value, updateValue];
}

export default useLocalStorage;

import { useEffect, useState } from "react";

export function useLocalStorage(
  key: string,
  initialValue = "",
): [string, (v: string) => void] {
  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const item = window.localStorage.getItem(key);
        const value = JSON.parse(item as string);
        setStoredValue(value);
      } catch (e) {
        setStoredValue(initialValue);
      }
    }
  }, [initialValue, key, setStoredValue]);

  const setValue = (value: string) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue];
}

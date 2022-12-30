import { useEffect, useState } from 'react';

export const useDebounce: <T>(value: T, delay: number) => void = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const hanlder = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(hanlder);
    };
  }, [value]);

  return debouncedValue;
};

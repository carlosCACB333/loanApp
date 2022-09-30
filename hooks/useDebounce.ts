import {useEffect, useState} from 'react';

export const useDebounce = (value: string, time = 1000) => {
  const [debounce, setDebounce] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(value);
    }, time);
    return () => clearTimeout(timer);
  }, [value, time]);

  return {debounce};
};

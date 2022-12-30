import { useEffect, useRef } from 'react';

export const useInterval: (callback: () => void, delay: number) => void = (callback, delay) => {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick(): void {
      savedCallback.current?.();
    }

    const timer = setInterval(tick, delay);
    return () => {
      clearInterval(timer);
    };
  }, [callback, delay]);
};

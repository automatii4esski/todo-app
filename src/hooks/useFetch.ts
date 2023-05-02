import { useState } from 'react';

export const useFetch = function <T extends any[]>(
  callback: (...args: T) => any
): [(...args: T) => any, boolean, Error | unknown] {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | unknown>();

  const returnFunction = async function (...args: T) {
    try {
      setIsLoading(true);
      await callback(...args);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return [returnFunction, isLoading, error];
};

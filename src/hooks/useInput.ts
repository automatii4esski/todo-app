import { ChangeEvent, useState } from 'react';

export const useInput = function (): [
  string,
  (e: ChangeEvent<HTMLInputElement>) => void
] {
  const [value, setValue] = useState<string>('');

  const onChange = function (e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  };

  return [value, onChange];
};

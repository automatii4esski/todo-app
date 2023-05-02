import { ITask } from '../types/types';

export const getDate = function (inputDate: number | string | Date) {
  const date = new Date(inputDate);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };

  const formattedDate = date.toLocaleDateString('en-GB', options);
  return formattedDate;
};

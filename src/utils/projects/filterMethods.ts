import { IProjectSortOption } from '../../types/projects';
import { ChangeEvent } from 'react';

const onChangeSort = function (
  setSort: (value: IProjectSortOption['value']) => void
) {
  return (e: ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value as IProjectSortOption['value']);
  };
};

const onSearchChange = function (setQuery: (value: string) => void) {
  return (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
};

export const getFilterMethods = function (
  setQuery: (value: string) => void,
  setSort: (value: IProjectSortOption['value']) => void
) {
  return {
    onChangeSort: onChangeSort(setSort),
    onSearchChange: onSearchChange(setQuery),
  };
};

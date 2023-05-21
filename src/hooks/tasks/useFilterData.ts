import { useState } from 'react';
import {
  ITaskQueryObj,
  ITaskSearchQuery,
  ITaskSort,
  ITaskSortObj,
  ITaskSortOption,
  ITasks,
} from '../../types/tasks';

export const useSort = function () {
  const [sort, setSort] = useState<ITaskSort>({
    outdated: '',
    inProgress: '',
    done: '',
  });

  const sortObj = {} as ITaskSortObj;

  Object.keys(sort).forEach((key) => {
    const sortData = {
      value: sort[key as keyof ITasks],
      set: (value: ITaskSortOption['value'] | '') => {
        setSort({
          ...sort,
          [key]: value,
        });
      },
    };
    Object.defineProperty(sortObj, key, { value: sortData });
  });

  return sortObj;
};

export const useQuery = function () {
  const [query, setQuery] = useState<ITaskSearchQuery>({
    outdated: '',
    inProgress: '',
    done: '',
  });

  const queryObj = {} as ITaskQueryObj;

  Object.keys(query).forEach((key) => {
    const queryData = {
      value: query[key as keyof ITasks],
      set: (value: string) => {
        setQuery({
          ...query,
          [key]: value,
        });
      },
    };
    Object.defineProperty(queryObj, key, { value: queryData });
  });

  return queryObj;
};

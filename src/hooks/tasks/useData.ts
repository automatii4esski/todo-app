import { useState } from 'react';
import { ITaskSearchQuery, ITaskSort, ITasks } from '../../types/tasks';

export const useSort = function (): [
  sort: ITaskSort,
  setSort: (sort: ITaskSort) => void
] {
  const [sort, setSort] = useState<ITaskSort>({
    outdated: '',
    inProgress: '',
    done: '',
  });
  return [sort, setSort];
};

export const useQuery = function (): [
  query: ITaskSearchQuery,
  setQuery: (query: ITaskSearchQuery) => void
] {
  const [query, setQuery] = useState<ITaskSearchQuery>({
    outdated: '',
    inProgress: '',
    done: '',
  });

  return [query, setQuery];
};

export const useTasks = function (): [
  tasks: ITasks,
  setTasks: (tasks: ITasks) => void
] {
  const [tasks, setTasks] = useState<ITasks>({
    outdated: [],
    inProgress: [],
    done: [],
  });

  return [tasks, setTasks];
};

import { useState, useEffect } from 'react';
import { ITaskSearchQuery, ITaskSort, ITasks } from '../../types/tasks';
import { TaskService } from '../../API/TaskService';
import { distributeTasks } from '../../utils/tasks/distributeTasks';
import { useFetch } from '../useFetch';

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

export const useFetchTasks = function (
  setTasks: (tasks: ITasks) => void
): [isLoading: boolean, error: Error | unknown] {
  const [fetchTasks, isTasksLoading, tasksError] = useFetch(async () => {
    const response = await TaskService.getAll();
    const [outdated, inProgress, done] = distributeTasks(response.data);

    setTasks({
      outdated: outdated,
      inProgress: inProgress,
      done: done,
    });
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  return [isTasksLoading, tasksError];
};

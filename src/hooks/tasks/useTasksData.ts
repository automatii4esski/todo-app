import { useState, useEffect } from 'react';
import { ITaskQueryObj, ITaskSortObj, ITasks } from '../../types/tasks';
import { TaskService } from '../../API/TaskService';
import { distributeTasks } from '../../utils/tasks/distributeTasks';
import { useFetch } from '../useFetch';
import { useSearchedAndSortedTasks } from './useFilterTasks';

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

export const useFilteredTasks = function (
  tasks: ITasks,
  sort: ITaskSortObj,
  query: ITaskQueryObj
) {
  const filteredTasks: ITasks = {
    outdated: useSearchedAndSortedTasks(
      tasks.outdated,
      sort.outdated.value,
      query.outdated.value
    ),
    inProgress: useSearchedAndSortedTasks(
      tasks.inProgress,
      sort.inProgress.value,
      query.inProgress.value
    ),
    done: useSearchedAndSortedTasks(
      tasks.done,
      sort.done.value,
      query.done.value
    ),
  };

  return filteredTasks;
};

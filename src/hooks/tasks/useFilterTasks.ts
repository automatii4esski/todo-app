import { ITask, ITaskSortOption } from '../../types/tasks';
import { useMemo } from 'react';

export const useSortedTasks = function (
  tasks: ITask[],
  sort: ITaskSortOption['value'] | ''
) {
  const sortedTasks = useMemo(() => {
    if (!sort) return tasks;

    return [...tasks].sort((a, b) => {
      if (sort !== 'date') return a[sort].localeCompare(b[sort]);
      if (a[sort] < b[sort]) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
  }, [sort, tasks]);
  return sortedTasks;
};

export const useSearchedTasks = function (tasks: ITask[], query: string) {
  const searchedTasks = useMemo(() => {
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(query) ||
        task.desc.toLowerCase().includes(query)
    );
  }, [tasks, query]);

  return searchedTasks;
};

export const useSearchedAndSortedTasks = function (
  tasks: ITask[],
  sort: ITaskSortOption['value'] | '',
  query: string
) {
  const sortedTasks = useSortedTasks(tasks, sort);
  const searchedAndSortedTasks = useSearchedTasks(sortedTasks, query);
  return searchedAndSortedTasks;
};

import { ITask } from '../types/types';
import { useMemo } from 'react';

export const useSortedTasks = function (tasks: ITask[], sort: string) {
  const sortedTasks = useMemo(() => {}, [sort, tasks]);
  return sortedTasks;
};

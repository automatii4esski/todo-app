import { ITask } from '../types/types';
import { useMemo } from 'react';

export const useTasks = function (tasks: ITask[], status: ITask['status']) {
  const doneTasks = useMemo(() => {
    console.log(status);
    console.log(tasks);

    return tasks.filter((task) => task.status === status);
  }, [tasks]);
  return doneTasks;
};

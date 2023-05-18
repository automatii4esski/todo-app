import React, { useMemo } from 'react';
import { IProjectTask, ProgectTaskStatus } from '../types/common';

export const useTasks = function (
  tasks: IProjectTask[],
  filter: ProgectTaskStatus | ''
) {
  const filterredTasks = useMemo(() => {
    if (!filter) return tasks;

    return tasks.filter((task) => task.status === filter);
  }, [tasks, filter]);

  return filterredTasks;
};

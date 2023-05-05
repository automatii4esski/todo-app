import { ISortOption, ITask, ITaskSortOption } from '../types/types';
import { useMemo, useState } from 'react';
import { isOutdate } from '../utils/isOutdate';

export const useSortedTasks = function (
  tasks: ITask[],
  sort: ITaskSortOption['value']
) {
  const sortedTasks = useMemo(() => {
    return tasks.sort((a, b) => {
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

export const useTasksSort = function () {
  const [sort, setSort] = useState({
    outdated: '',
    inProgress: '',
    done: '',
  });
  return [sort, setSort];
};

import { ITask } from '../../types/tasks';
import { isOutdate } from '../isOutdate';

export const distributeTasks = function (
  tasks: ITask[]
): [outdated: ITask[], inProgress: ITask[], done: ITask[]] {
  const doneTasks: ITask[] = [];
  const outdatedTasks: ITask[] = [];
  const inProgressTasks: ITask[] = [];
  tasks.forEach((task) => {
    if (task.status === 'done') {
      doneTasks.push(task);
    } else {
      isOutdate(task.date)
        ? outdatedTasks.push(task)
        : inProgressTasks.push(task);
    }
  });
  return [outdatedTasks, inProgressTasks, doneTasks];
};

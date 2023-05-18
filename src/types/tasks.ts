import { ISortOption } from './common';

type TaskStatus = 'active' | 'done';

export interface ITaskSortOption extends ISortOption {
  value: keyof Pick<ITask, 'title' | 'desc' | 'date'>;
  text: string;
}

export interface ITasks {
  outdated: ITask[];
  inProgress: ITask[];
  done: ITask[];
}

export interface ITaskMethods {
  onTaskDoneClick: (tasksName: keyof ITasks, taskToInteract: ITask) => void;
  onTaskDeleteClick: (tasksName: keyof ITasks, taskToInteract: ITask) => void;
  onTaskReturnClick: (taskToInteract: ITask) => void;
  onTaskEditClick: (
    tasksName: keyof ITasks,
    taskToInteract: ITask,
    setTask: (task: ITask) => void
  ) => void;
}

export interface ITaskEditState {
  value: ITask;
  set: (task: ITask) => void;
  taskName: keyof ITasks;
}

export interface ITaskSearchQuery {
  outdated: string;
  done: string;
  inProgress: string;
}

export interface ITaskSort {
  outdated: ITaskSortOption['value'] | '';
  done: ITaskSortOption['value'] | '';
  inProgress: ITaskSortOption['value'] | '';
}

export interface ITask {
  id: number;
  title: string;
  desc: string;
  status: TaskStatus;
  date: number;
}

export type SetTasksHelper<TTaskArr = [name: keyof ITasks, array: ITask[]]> = (
  ...tasks: Array<TTaskArr>
) => void;

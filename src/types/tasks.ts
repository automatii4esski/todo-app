import { ISortOption } from './common';

type TaskStatus = 'active' | 'done';

export type HeaderVariant = 'yellow' | 'green' | 'red';

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

interface IFilterObjValue<TValueType> {
  value: TValueType;
  set: (value: TValueType) => void;
}

interface IFilterObj<TValueType> {
  outdated: IFilterObjValue<TValueType>;
  done: IFilterObjValue<TValueType>;
  inProgress: IFilterObjValue<TValueType>;
}

export interface ITaskQueryObj extends IFilterObj<string> {}
export interface ITaskSortObj
  extends IFilterObj<ITaskSortOption['value'] | ''> {}

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

export interface ITaskColumnHeader {
  tasksArrName: keyof ITasks;
  title: string;
  tasksCount: number;
  options: ISortOption[];
  query: ITaskQueryObj;
  sort: ITaskSortObj;
  headerVariant?: HeaderVariant;
  main?: {
    createTaskHandler: () => void;
    isPopupActive: boolean;
  };
}

export interface ITaskColumn extends Omit<ITaskColumnHeader, 'tasksCount'> {
  taskMethods: ITaskMethods;
  tasksArrName: keyof ITasks;
  tasks: ITasks;
  isLoading: boolean;
  stringLimit: number;
  small?: boolean;
}

export interface ICreateTaskForm {
  onSubmit: (task: ITask) => void;
}

export interface IEditTaskForm {
  onSubmit: (task: ITask) => void;
  task: ITask | undefined;
}

export interface ITaskItem {
  limit: number;
  task: ITask;
  tasksArrName: keyof ITasks;
  taskMethods: ITaskMethods;
}

export interface ITaskDesc {
  textToShow: string;
  sliceString: string;
  isShow: boolean;
  subText: 'Show' | 'Hide';
}

import { ISortOption } from './common';

export interface IProjectItem {
  project: IProject;
}

export type ProgectTaskStatus = 'done' | 'active';

export interface IProjectSortOption extends ISortOption {
  value: keyof Pick<IProject, 'title' | 'desc' | 'deadline' | 'tasksTotal'>;
  text: string;
}

export interface IProjectTask {
  id: number;
  desc: string;
  status: ProgectTaskStatus;
}

export interface IAditionalDesc {
  date: number;
  text: string;
}

export interface IProject {
  id: number;
  desc: string;
  additionalDescs: IAditionalDesc[];
  title: string;
  deadline: number;
  tasksDone: number;
  tasksTotal: number;
  tasks: IProjectTask[];
}

export interface IProjectTaskMethods {
  onTaskReturnClick: (taskToInteract: IProjectTask) => void;
  onTaskDoneClick: (taskToInteract: IProjectTask) => void;
  onTaskDeleteClick: (taskToInteract: IProjectTask) => void;
  onTaskEditClick: (
    setDescInputValue: (value: string) => void,
    setBtnClasses: (classes: IBtnClasses) => void,
    setTaskToEdit: (task: IProjectTask) => void,
    setCreateState: (state: ICreateState) => void
  ) => void;
}

export type ProjectWrappedTaskMethods = Record<
  keyof IProjectTaskMethods,
  () => void
>;

export interface IProjectTaskFormMethods {
  onSubmitEditTask: (editedTask: IProjectTask) => void;
  onSubmitCreateTask: (task: IProjectTask) => void;
}

export interface IBtnClasses {
  add: string;
  edit: string;
}

export interface ICreateState {
  class: string;
}

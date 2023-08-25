import { ChangeEvent, MouseEvent } from 'react';
import { IAditionalDesc, IProject, IProjectTask } from './project';

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

export interface ISingleProjectMicrotasks {
  data: IProject;
  taskMethods: IProjectTaskMethods;
  taskFormCallbackMethods: IProjectTaskFormMethods;
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

export interface ICreateState {
  class: string;
}

export interface IFilterClasses {
  done: string;
  active: string;
  all: string;
}

export interface ICreateFormMethods {
  onDescInputChange: (e: ChangeEvent<any>) => void;
  onOutCreateFormClick: () => void;
  onCreateFormClick: (e: MouseEvent<any>) => void;
  onCloseCreateFormClick: () => void;
  onCreateSubmit: (e: MouseEvent<any>) => void;
  onEditSubmit: (e: MouseEvent<any>) => void;
}

export interface IFilterMethods {
  onDone: () => void;
  onActive: () => void;
  onAll: () => void;
}

export interface IAdditionalDescClass {
  button: string;
  input: string;
}

export interface ICreateProjectTaskForm {
  onDelete: (id: number) => void;
  id: number;
}

export interface ISingleProjectDescriptionCreateForm {
  onSubmitAdditionalDesc: (value: string) => void;
}

export interface ISingleProjectMicrotasksCreateForm {
  formMethods: ICreateFormMethods;
  descInputValue: string;
  createState: ICreateState;
  btnClasses: IBtnClasses;
}

export interface ISingleProjectDescription {
  desc: string;
  additionalDescs: IAditionalDesc[];
  onSubmitAdditionalDesc: (newText: string) => void;
}

export interface ISingleProjectMicrotasksTop {
  filterMethods: IFilterMethods;
  filterClasses: IFilterClasses;
}

export interface ISingleProjectMicrotasksBot {
  data: IProject;
  onCreateTaskClick: () => void;
}

export interface ISingleProjectTask {
  task: IProjectTask;
  getWrappedTaskMethods: (task: IProjectTask) => ProjectWrappedTaskMethods;
}

export interface ISingleProjectApprovePopupContent {
  type: 'complete' | 'delete';
  projectID: number;
  onDeclineClick: () => void;
}

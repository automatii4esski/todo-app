import { ChangeEvent, MouseEvent } from 'react';
import { IProjectComment, IProject, IProjectTask } from './project';

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

export interface ICommentClass {
  button: string;
  input: string;
}

export interface ICreateProjectTasksForm {
  data: IProject;
  formMethods: {
    onAddTaskClick: (...args: any) => any;
    onDeleteTask: (...args: any) => any;
    onDateChange: (...args: any) => any;
    onTitleChange: (...args: any) => any;
    onDescChange: (...args: any) => any;
    onFormSubmit: (...args: any) => any;
    onChangeTaskDesc: (...args: any) => any;
    onSelectPriorityChange: (...args: any) => any;
    onInsideColorLabelChange: (...args: any) => any;
  };
  taskInputValue: string;
}

export interface ISingleProjectCommentCreateForm {
  onSubmitComment: (value: string) => void;
}

export interface ISingleProjectMicrotasksCreateForm {
  formMethods: ICreateFormMethods;
  descInputValue: string;
  createState: ICreateState;
  btnClasses: IBtnClasses;
}

export interface ISingleProjectDescription {
  project: IProject;
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

export interface IEditProjectForm {
  initProject: IProject;
  onEditSubmit: (project: IProject) => void;
}

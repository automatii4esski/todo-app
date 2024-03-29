import { IProject, IProjectTask } from '../types/project';

export const initProjectValue: IProject = {
  id: 0,
  deadline: Date.now(),
  desc: '',
  title: '',
  tasks: [],
  comments: [],
  tasksTotal: 0,
  tasksDone: 0,
  color: 'black',
  priority: 1,
};

export const initProjectTaskValue: IProjectTask = {
  id: 0,
  desc: '',
  status: 'active',
};

export const initFilterClassesValue = {
  done: '',
  active: '',
  all: '--active',
};

export const initBtnClassesValue = {
  add: '',
  edit: '--disabled',
};

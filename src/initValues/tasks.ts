import { ITask, ITaskDesc, ITaskEditState } from '../types/tasks';

export const initTaskValue: ITask = {
  id: 0,
  date: Date.now(),
  desc: '',
  status: 'active',
  title: '',
};

export const initTaskEditState: ITaskEditState = {
  value: initTaskValue,
  set: (task: ITask) => {},
  taskName: 'done',
};

export const initTaskDescValue: ITaskDesc = {
  textToShow: '',
  sliceString: '',
  isShow: false,
  subText: 'Show',
};

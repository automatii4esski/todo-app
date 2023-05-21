import { ChangeEvent } from 'react';
import { ITask } from '../../types/tasks';

const onDateChange = function (data: ITask, setData: (task: ITask) => void) {
  return (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setData({
        ...data,
        date: new Date(e.target.value).getTime(),
      });
    }
  };
};

const onDescChange = function (data: ITask, setData: (task: ITask) => void) {
  return (e: ChangeEvent<HTMLTextAreaElement>) => {
    setData({
      ...data,
      desc: e.target.value,
    });
  };
};

const onTitleChange = function (data: ITask, setData: (task: ITask) => void) {
  return (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      title: e.target.value,
    });
  };
};

export const getMethods = function (
  data: ITask,
  setData: (task: ITask) => void
) {
  return {
    onDateChange: onDateChange(data, setData),
    onDescChange: onDescChange(data, setData),
    onTitleChange: onTitleChange(data, setData),
  };
};

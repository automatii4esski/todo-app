import { ChangeEvent, FormEvent } from 'react';
import { IProject, IProjectTask } from '../../types/project';
import { initProjectValue } from '../../initValues/singleProject';
import { ProjectService } from '../../API/ProjectService';

const onAddTaskClick = function (
  data: IProject,
  setData: (data: IProject) => void,
  taskValue: string,
  setTaskValue: (value: string) => void
) {
  return () => {
    if (!taskValue) return;

    const newTasks: IProjectTask[] = [
      {
        id: Date.now(),
        desc: taskValue,
        status: 'active',
      },
      ...data.tasks,
    ];

    setData({
      ...data,
      tasksTotal: ++data.tasksTotal,
      tasks: newTasks,
    });
    setTaskValue('');
  };
};

const onDeleteTask = function (
  data: IProject,
  setData: (data: IProject) => void
) {
  return (id: number) => {
    return () => {
      setData({
        ...data,
        tasksTotal: --data.tasksTotal,
        tasks: data.tasks.filter((task) => task.id !== id),
      });
    };
  };
};

const onDateChange = function (
  data: IProject,
  setData: (data: IProject) => void
) {
  return (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setData({
        ...data,
        deadline: new Date(e.target.value).getTime(),
      });
    }
  };
};

const onTitleChange = function (
  data: IProject,
  setData: (data: IProject) => void
) {
  return (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      title: e.target.value,
    });
  };
};
const onDescChange = function (
  data: IProject,
  setData: (data: IProject) => void
) {
  return (e: ChangeEvent<HTMLTextAreaElement>) => {
    setData({
      ...data,
      desc: e.target.value,
    });
  };
};

const onFormSubmit = function (
  data: IProject,
  setData: (data: IProject) => void,
  onCreateProject: (project: IProject) => void
) {
  return (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const finalData = {
      ...data,
      id: Date.now(),
    };
    ProjectService.post(finalData);
    onCreateProject(finalData);
    setData(initProjectValue);
  };
};

const onChangeTaskDesc = function (setTaskValue: (value: string) => void) {
  return (e: ChangeEvent<HTMLInputElement>) => {
    setTaskValue(e.target.value);
  };
};

export const getCreateProjectFormMethods = function (
  data: IProject,
  setData: (data: IProject) => void,
  taskValue: string,
  setTaskValue: (value: string) => void,
  onCreateProject: (project: IProject) => void
) {
  return {
    onAddTaskClick: onAddTaskClick(data, setData, taskValue, setTaskValue),
    onDeleteTask: onDeleteTask(data, setData),
    onDateChange: onDateChange(data, setData),
    onTitleChange: onTitleChange(data, setData),
    onDescChange: onDescChange(data, setData),
    onFormSubmit: onFormSubmit(data, setData, onCreateProject),
    onChangeTaskDesc: onChangeTaskDesc(setTaskValue),
  };
};

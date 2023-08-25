import { MouseEvent, ChangeEvent } from 'react';
import {
  ICreateState,
  IProjectTaskFormMethods,
} from '../../types/singleProject';
import { IProjectTask } from '../../types/project';

const onCreateSubmit = function (
  taskFormCallbackMethods: IProjectTaskFormMethods,
  setCreateState: (state: ICreateState) => void,
  setDescInputValue: (desc: string) => void,
  descInputValue: string
) {
  return (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setCreateState({
      class: '',
    });
    if (!descInputValue) return;
    const newTask: IProjectTask = {
      desc: descInputValue,
      status: 'active',
      id: Date.now(),
    };
    taskFormCallbackMethods.onSubmitCreateTask(newTask);
    setDescInputValue('');
  };
};

const onEditSubmit = function (
  taskFormCallbackMethods: IProjectTaskFormMethods,
  setCreateState: (state: ICreateState) => void,
  setDescInputValue: (desc: string) => void,
  descInputValue: string,
  taskToEdit: IProjectTask
) {
  return (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCreateState({
      class: '',
    });
    if (!descInputValue) return;

    const newTask = {
      ...taskToEdit,
      desc: descInputValue,
    };
    setDescInputValue('');

    taskFormCallbackMethods.onSubmitEditTask(newTask);
  };
};

const onDescInputChange = function (setDescInputValue: (desc: string) => void) {
  return (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescInputValue(e.target.value);
  };
};

const onOutCreateFormClick = function (
  setCreateState: (state: ICreateState) => void
) {
  return () => {
    setCreateState({
      class: '',
    });
  };
};

const onCreateFormClick = function () {
  return (e: MouseEvent<HTMLFormElement>) => {
    e.stopPropagation();
  };
};

const onCloseCreateFormClick = function (
  setCreateState: (state: ICreateState) => void,
  setDescInputValue: (desc: string) => void
) {
  return () => {
    setDescInputValue('');

    setCreateState({
      class: '',
    });
  };
};

export const getTaskFormMethods = function (
  taskFormCallbackMethods: IProjectTaskFormMethods,
  setCreateState: (state: ICreateState) => void,
  setDescInputValue: (desc: string) => void,
  descInputValue: string,
  taskToEdit: IProjectTask
) {
  return {
    onDescInputChange: onDescInputChange(setDescInputValue),
    onOutCreateFormClick: onOutCreateFormClick(setCreateState),
    onCreateFormClick: onCreateFormClick(),
    onCloseCreateFormClick: onCloseCreateFormClick(
      setCreateState,
      setDescInputValue
    ),
    onCreateSubmit: onCreateSubmit(
      taskFormCallbackMethods,
      setCreateState,
      setDescInputValue,
      descInputValue
    ),
    onEditSubmit: onEditSubmit(
      taskFormCallbackMethods,
      setCreateState,
      setDescInputValue,
      descInputValue,
      taskToEdit
    ),
  };
};

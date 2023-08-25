import { createContext } from 'react';
import { UserDataContext } from '../../types/common';

export const userDataContext = createContext<UserDataContext | null>(null);

export const initUserDataContextValue = {
  tasksDone: 0,
  projectsDone: 0,
};

export const userDataReducer = function (
  state: UserDataContext['value'],
  action: { type: string; payload?: any }
): UserDataContext['value'] {
  const { projectsDone, tasksDone } = state;

  switch (action.type) {
    case 'SET':
      return action.payload;
    case 'ADD_PROJECT':
      return { ...state, projectsDone: projectsDone + 1 };
    case 'REMOVE_PROJECT':
      return { ...state, projectsDone: projectsDone - 1 };
    case 'ADD_TASK':
      return { ...state, tasksDone: tasksDone + 1 };
    case 'REMOVE_TASK':
      return { ...state, tasksDone: tasksDone - 1 };
    default:
      return state;
  }
};

export const setUserData = function (value: UserDataContext['value']) {
  return {
    type: 'SET',
    payload: value,
  };
};

export const addToTotalTasksDone = function () {
  return {
    type: 'ADD_TASK',
  };
};

export const removeFromTotalTasksDone = function () {
  return {
    type: 'REMOVE_TASK',
  };
};

export const addToTotalProjectsDone = function () {
  return {
    type: 'ADD_PROJECT',
  };
};

export const removeFromTotalProjectsDone = function () {
  return {
    type: 'REMOVE_PROJECT',
  };
};

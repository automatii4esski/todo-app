import { useReducer, useEffect, useContext, Reducer } from 'react';
import {
  initProjectContextValue,
  projectsReducer,
} from '../context/projectsContext/ProjectsContext';
import { IProjectsContext, UserDataContext } from '../types/common';
import {
  initUserDataContextValue,
  userDataReducer,
} from '../context/totalTasksAndProjectsDoneContext/UserDataContext';

export const useProjectReducer = function () {
  const [state, dispatch] = useReducer<Reducer<IProjectsContext['value'], any>>(
    projectsReducer,
    initProjectContextValue
  );
  return {
    value: state,
    dispatch,
  };
};

export const useUserDataReducer = function () {
  const [state, dispatch] = useReducer<Reducer<UserDataContext['value'], any>>(
    userDataReducer,
    initUserDataContextValue
  );
  return {
    value: state,
    dispatch,
  };
};

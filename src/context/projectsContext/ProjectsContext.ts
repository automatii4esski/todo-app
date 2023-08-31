import { createContext } from 'react';
import { IAction, IProjectsContext } from '../../types/common';
import { IProject } from '../../types/project';
import { initProjectValue } from '../../initValues/singleProject';

export const projectsContext = createContext<IProjectsContext | null>(null);

//InitValue
export const initProjectContextValue: IProjectsContext['value'] = {
  projects: [],
  error: undefined,
  isLoading: false,
  isAllowedToLoad: true,
  singleProjectIndex: 0,
};

//Reducer
export const projectsReducer = function (
  state: IProjectsContext['value'],
  action: IAction
): IProjectsContext['value'] {
  switch (action.type) {
    case 'SET_ALL':
      return action.payload;
    case 'SET_PROJECTS':
      return { ...state, projects: action.payload };
    case 'SET_PROJECT_INDEX':
      return {
        ...state,
        singleProjectIndex: state.projects.findIndex(
          (prj) => prj.id === action.payload
        ),
      };
    case 'UPDATE_SINGLEPROJECT':
      state.projects[state.singleProjectIndex] = action.payload;
      return state;
    case 'SET_IS_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_IS_ALLOWED_TO_LOAD':
      return { ...state, isAllowedToLoad: action.payload };

    case 'DELETE_PROJECT_BY_ID':
      const newProjects = state.projects.filter(
        (project) => project.id !== action.payload
      );

      return {
        ...state,
        projects: newProjects,
      };
    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    default:
      return state;
  }
};

//Actions
export const setAll = function (value: IProjectsContext['value']) {
  return {
    type: 'SET_ALL',
    payload: value,
  };
};

export const setProjectIndex = function (projectId: number) {
  return {
    type: 'SET_PROJECT_INDEX',
    payload: projectId,
  };
};

export const updateSingleProject = function (project: IProject) {
  return {
    type: 'UPDATE_SINGLEPROJECT',
    payload: project,
  };
};

export const setIsLoading = function (isLoading: boolean) {
  return {
    type: 'SET_IS_LOADING',
    payload: isLoading,
  };
};

export const setIsAllowedToLoad = function (isAllowed: boolean) {
  return {
    type: 'SET_IS_ALLOWED_TO_LOAD',
    payload: isAllowed,
  };
};

export const setError = function (error: string) {
  return {
    type: 'SET_ERROR',
    payload: error,
  };
};

export const setProjects = function (projects: IProject[]) {
  return {
    type: 'SET_PROJECTS',
    payload: projects,
  };
};

export const deleteProjectById = function (id: number) {
  return {
    type: 'DELETE_PROJECT_BY_ID',
    payload: id,
  };
};

export const addProject = function (project: IProject) {
  return {
    type: 'ADD_PROJECT',
    payload: project,
  };
};

import { Dispatch, FC, PropsWithChildren, RefObject } from 'react';
import { IProject } from './project';

export type MyFCStrict<TProps = {}> = FC<PropsWithChildren<TProps>>;
export type MyFC<TProps = {}> = FC<
  PropsWithChildren<TProps & Record<any, any>>
>;
export type RefObj<TElement = HTMLElement> = Partial<{
  reference: RefObject<TElement> | undefined;
}>;

export interface ISortOption {
  value: string;
  text: string;
}

export interface IAction {
  type: string;
  payload?: any;
}

export interface IDispatchContext {
  dispatch: Dispatch<any>;
}

export interface IContextProvider<TReducerType> {
  reducer: TReducerType;
}

export interface UserDataContext extends IDispatchContext {
  value: { tasksDone: number; projectsDone: number };
}

export interface IProjectsContext extends IDispatchContext {
  value: {
    projects: IProject[];
    isLoading: boolean;
    error: undefined | string;
    isAllowedToLoad: boolean;
    singleProjectIndex: number;
  };
}

export interface IErrorMessage {
  text: string;
}

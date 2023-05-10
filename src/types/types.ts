import { FC, PropsWithChildren, RefObject } from 'react';

export type MyFCStrict<TProps = {}> = FC<PropsWithChildren<TProps>>;
export type MyFC<TProps = {}> = FC<
  PropsWithChildren<TProps & Record<any, any>>
>;
export type RefObj<TElement = HTMLElement> = Partial<{
  reference: RefObject<TElement> | undefined;
}>;

type TaskStatus = 'active' | 'done';

export interface ITask {
  id: number;
  title: string;
  desc: string;
  status: TaskStatus;
  date: number;
}

export interface ISortOption {
  value: string;
  text: string;
}

export interface ITaskSortOption extends ISortOption {
  value: keyof Pick<ITask, 'title' | 'desc' | 'date'>;
  text: string;
}

export type ProgectTaskStatus = 'done' | 'active';

export interface IProjectTask {
  id: number;
  desc: string;
  status: ProgectTaskStatus;
}

export interface IAditionalDesc {
  date: number;
  text: string;
}

export interface IProject {
  id: number;
  desc: string;
  additionalDescs: IAditionalDesc[];
  title: string;
  deadline: number;
  tasksDone: number;
  tasksTotal: number;
  tasks: IProjectTask[];
}

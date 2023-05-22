import { ISortOption } from './common';

export interface IProjectItem {
  project: IProject;
}

export type ProgectTaskStatus = 'done' | 'active';

export interface IProjectSortOption extends ISortOption {
  value: keyof Pick<IProject, 'title' | 'desc' | 'deadline' | 'tasksTotal'>;
  text: string;
}

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

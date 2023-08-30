import { ISortOption } from './common';
import { projectColors } from '../values/colors';

export interface IProjectItem {
  project: IProject;
}

export type ProjectColors = (typeof projectColors)[number];

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

export interface IProjectComment {
  date: number;
  text: string;
}

export interface IProject {
  id: number;
  desc: string;
  comments: IProjectComment[];
  title: string;
  deadline: number;
  tasksDone: number;
  tasksTotal: number;
  tasks: IProjectTask[];
  color: ProjectColors;
  priority: string | number;
}

export interface ICreateProjectForm {
  onCreateProject: (project: IProject) => void;
}

export interface ICreateProjectMainDataForm {
  data: IProject;
  formMethods: {
    onDateChange: (...args: any) => any;
    onTitleChange: (...args: any) => any;
    onDescChange: (...args: any) => any;
    onSelectPriorityChange: (...args: any) => any;
    onInsideColorLabelChange: (...args: any) => any;
  };
}

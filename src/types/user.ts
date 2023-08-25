import { IProject } from './project';
import { ITask } from './tasks';

export interface IUser {
  totalDone: {
    projects: number;
    tasks: number;
  };
  tasks: ITask[];
  projects: IProject[];
}

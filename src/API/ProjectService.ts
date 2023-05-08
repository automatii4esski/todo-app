import axios from 'axios';
import { IProject, ITask } from '../types/types';

export class ProjectService {
  static async getAll() {
    const response = await axios<IProject[]>('http://localhost:3001/projects');
    return response;
  }

  static async post(project: IProject) {
    const response = await axios.post<IProject[]>(
      'http://localhost:3001/projects',
      project
    );
    return response;
  }
}

import axios from 'axios';
import { IProject, IProjectComment } from '../types/project';

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

  static async patchTask(
    projectId: number | string,
    newData: Partial<IProject>
  ) {
    const response = await axios.patch(
      `http://localhost:3001/projects/${projectId}`,
      newData
    );
    return response;
  }

  static async deleteProject(projectId: number) {
    const response = await axios.delete(
      `http://localhost:3001/projects/${projectId}`
    );

    return response;
  }

  static async getById(id: number | string) {
    const response = await axios<IProject[]>(
      `http://localhost:3001/projects?id=${id}`
    );
    return response;
  }

  static async putById(project: IProject) {
    const response = await axios.put<IProject[]>(
      `http://localhost:3001/projects/${project.id}`,
      project
    );
    return response;
  }
}

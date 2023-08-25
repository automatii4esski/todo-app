import axios from 'axios';
import { IUser } from '../types/user';

export class UserService {
  static async getTasksAndProjectsDone() {
    const response = await axios<IUser['totalDone']>(
      'http://localhost:3001/totalDone'
    );
    return response;
  }

  static async updateTotalProjectsDone(newTotalProjects: number) {
    const response = await axios.patch<IUser['totalDone']>(
      'http://localhost:3001/totalDone',
      { projects: newTotalProjects }
    );

    return response;
  }
}

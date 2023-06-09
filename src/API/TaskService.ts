import axios from 'axios';
import { ITask } from '../types/tasks';

export class TaskService {
  static async getAll() {
    const response = await axios<ITask[]>('http://localhost:3001/tasks');
    return response;
  }

  static async put(task: ITask) {
    const response = await axios.put(
      `http://localhost:3001/tasks/${task.id}`,
      task
    );

    return response;
  }

  static async delete(task: ITask) {
    const response = await axios.delete(
      `http://localhost:3001/tasks/${task.id}`
    );

    return response;
  }

  static async post(task: ITask) {
    const response = await axios.post('http://localhost:3001/tasks', task);

    return response;
  }
}

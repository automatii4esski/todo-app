import { IProjectSortOption } from '../types/project';

export const sortOptions: IProjectSortOption[] = [
  {
    value: 'deadline',
    text: 'By deadline',
  },
  {
    value: 'title',
    text: 'By title',
  },
  {
    value: 'desc',
    text: 'By desc',
  },
  {
    value: 'tasksTotal',
    text: 'By total tasks',
  },
];

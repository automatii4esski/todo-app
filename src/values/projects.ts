import { ISortOption } from '../types/common';
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

export const projectPriority: ISortOption[] = [];

for (let i = 1; i < 11; i++) {
  const priority = i.toString();

  projectPriority.push({
    value: priority,
    text: priority,
  });
}

import { useMemo } from 'react';
import { IProject, IProjectSortOption } from '../../types/project';

export const useSearchedProjects = function (
  projects: IProject[],
  query: string
) {
  const searchedProjects = useMemo(() => {
    return projects.filter(
      (project) => project.title.includes(query) || project.desc.includes(query)
    );
  }, [projects, query]);

  return searchedProjects;
};

export const useSortedProjects = function (
  projects: IProject[],
  sort: IProjectSortOption['value'] | ''
) {
  const sortedProjects = useMemo(() => {
    if (!sort) return projects;

    switch (sort) {
      case 'title':
      case 'desc':
        return [...projects].sort((a, b) => a[sort].localeCompare(b[sort]));

      case 'tasksTotal':
      case 'deadline':
        return [...projects].sort((a, b) => a[sort] - b[sort]);
    }
  }, [projects, sort]);

  return sortedProjects;
};

export const useSortedAndSearchedProjects = function (
  projects: IProject[],
  sort: IProjectSortOption['value'] | '',
  query: string
) {
  const sortedProjects = useSearchedProjects(projects, query);
  const searchedAndSortedProjects = useSortedProjects(sortedProjects, sort);

  return searchedAndSortedProjects;
};

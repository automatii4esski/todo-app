import { useEffect } from 'react';
import { ProjectService } from '../../API/ProjectService';
import { IProject } from '../../types/projects';
import { useFetch } from '../useFetch';

export const useFetchProjects = function (
  setProjects: (projects: IProject[]) => void
) {
  const [fetchProjects, isLoading, error] = useFetch(async () => {
    const response = await ProjectService.getAll();
    setProjects(response.data);
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  return [isLoading, error];
};

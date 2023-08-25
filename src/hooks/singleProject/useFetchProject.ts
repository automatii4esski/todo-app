import { useEffect } from 'react';

import { ProjectService } from '../../API/ProjectService';
import { IProject } from '../../types/project';
import { useFetch } from '../useFetch';

export const useFetchProject = function (
  setData: (project: IProject) => void,
  id: string | number
) {
  const [fetchProject, isLoading, error] = useFetch(async () => {
    const response = await ProjectService.getById(id);
    setData(response.data[0]);
  });

  useEffect(() => {
    fetchProject();
  }, []);

  return [isLoading, error];
};

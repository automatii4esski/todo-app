import { useEffect } from 'react';
import { IContextProvider, IProjectsContext, MyFC } from '../../types/common';
import {
  projectsContext,
  setAll,
  setError,
  setIsAllowedToLoad,
  setIsLoading,
  setProjects,
} from './ProjectsContext';
import { Outlet } from 'react-router-dom';

import { ProjectService } from '../../API/ProjectService';
import { useFetch } from '../../hooks/useFetch';

const ProjectsContextProvider: MyFC<IContextProvider<IProjectsContext>> = ({
  reducer,
}) => {
  const { value: state, dispatch } = reducer;

  const [fetchProjects, isLoading, error] = useFetch(async () => {
    dispatch(setIsLoading(true));
    const response = await ProjectService.getAll();
    dispatch(setProjects(response.data));
    dispatch(setIsAllowedToLoad(false));
  });

  useEffect(() => {
    dispatch(setIsLoading(isLoading));
    dispatch(setError((error as any)?.message));
  }, [error, isLoading]);

  useEffect(() => {
    if (state.isAllowedToLoad) {
      console.log('fetch');

      fetchProjects();
    }
  }, [state.isAllowedToLoad]);

  return (
    <projectsContext.Provider value={reducer}>
      <Outlet />
    </projectsContext.Provider>
  );
};

export default ProjectsContextProvider;

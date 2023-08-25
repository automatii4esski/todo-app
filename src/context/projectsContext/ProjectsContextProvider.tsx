import { useEffect } from 'react';
import { IContextProvider, IProjectsContext, MyFC } from '../../types/common';
import {
  projectsContext,
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

  const [fetchProjects, _, error] = useFetch(async () => {
    dispatch(setIsLoading(true));
    const response = await ProjectService.getAll();
    dispatch(setIsLoading(false));
    dispatch(setIsAllowedToLoad(false));
    dispatch(setError(error as string));
    dispatch(setProjects(response.data));
  });

  useEffect(() => {
    if (state.isAllowedToLoad) {
      fetchProjects();
    }
  }, []);

  return (
    <projectsContext.Provider value={reducer}>
      <Outlet />
    </projectsContext.Provider>
  );
};

export default ProjectsContextProvider;

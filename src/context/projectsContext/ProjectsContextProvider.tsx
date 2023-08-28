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

  const [fetchProjects, _, error] = useFetch(async () => {
    dispatch(setIsLoading(true));
    const response = await ProjectService.getAll();
    dispatch(
      setAll({
        error: error as string,
        isAllowedToLoad: false,
        projects: response.data,
        isLoading: false,
      })
    );
  });

  useEffect(() => {
    if (state.isAllowedToLoad) {
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

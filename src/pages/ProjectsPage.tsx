import React, { useState, useContext, useEffect } from 'react';
import ProjectItem from '../components/Projects/ProjectItem';
import { MyFC } from '../types/common';
import MyInput from '../components/UI/Input/MyInput';
import MySelect from '../components/UI/select/MySelect';
import PopupTemplate from '../components/UI/popup/PopupTemplate';
import CreateProjectForm from '../components/CreateForms/CreateProjectForm';
import { IProject, IProjectSortOption } from '../types/project';
import { getCreateFormPopupMethods } from '../utils/projects/createFormPopupMethods';
import { sortOptions } from '../values/projects';
import { useSortedAndSearchedProjects } from '../hooks/projects/useFilterProjects';
import { getFilterMethods } from '../utils/projects/filterMethods';

import MyButton from '../components/UI/button/MyButton';
import {
  addProject,
  projectsContext,
  setProjectIndex,
  setProjects,
  updateSingleProject,
} from '../context/projectsContext/ProjectsContext';
import Loader from '../components/UI/loader/Loader';
import Error from '../components/UI/message/Error';
import { initProjectValue } from '../initValues/singleProject';

const ProjectsPage: MyFC = () => {
  const { value: state, dispatch } = useContext(projectsContext)!;

  const [isPopupActive, setIsPopupActive] = useState<boolean>(false);

  const [sort, setSort] = useState<IProjectSortOption['value'] | ''>('');
  const [query, setQuery] = useState<string>('');

  const searchedAndSortedProjects = useSortedAndSearchedProjects(
    state.projects,
    sort,
    query
  );

  if (state.isLoading) {
    return <Loader className="projects__loader" />;
  }
  if (state.error) {
    return <Error text={state.error} />;
  }

  const renderProjects = function () {
    return state.projects.length !== 0 ? (
      <div className="projects-content">
        {searchedAndSortedProjects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </div>
    ) : (
      <p className="projects__message">No projects</p>
    );
  };

  const onCreateProjectClick = function (project: IProject) {
    dispatch(addProject(project));
    setIsPopupActive(false);
  };

  const createFormMethods = getCreateFormPopupMethods(setIsPopupActive);
  const filterMethods = getFilterMethods(setQuery, setSort);

  return (
    <div className="projects">
      <div className="projects-top">
        <MyInput
          onChange={filterMethods.onSearchChange}
          value={query}
          className="projects-top__item"
          placeholder="Search"
        />
        <MySelect
          onChange={filterMethods.onChangeSort}
          className="projects-top__item"
          sort={sort}
          options={sortOptions}
        />
        <MyButton
          onClick={createFormMethods.onClickCreateProject}
          className="projects-top__item"
        >
          Create Project
        </MyButton>
      </div>
      {renderProjects()}
      <PopupTemplate
        active={isPopupActive}
        // active={true}
        onHideHandler={createFormMethods.onHideCreateForm}
        className="project-popup__wrapper"
      >
        <CreateProjectForm onCreateProject={onCreateProjectClick} />
      </PopupTemplate>
    </div>
  );
};

export default ProjectsPage;

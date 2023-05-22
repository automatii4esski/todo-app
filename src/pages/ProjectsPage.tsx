import React, { useState } from 'react';
import MyButton from '../components/UI/button/MyButton';
import ProjectItem from '../components/Projects/ProjectItem';
import { MyFC } from '../types/common';
import MyInput from '../components/UI/Input/MyInput';
import MySelect from '../components/UI/select/MySelect';
import PopupTemplate from '../components/UI/popup/PopupTemplate';
import CreateProjectForm from '../components/CreateForms/CreateProjectForm';
import { IProject, IProjectSortOption } from '../types/projects';
import { getFormMethods } from '../utils/projects/createFormMethods';
import { sortOptions } from '../values/projects';
import { useSortedAndSearchedProjects } from '../hooks/projects/useFilterProjects';
import { getFilterMethods } from '../utils/projects/filterMethods';
import { useFetchProjects } from '../hooks/projects/useFetchProjects';

const ProjectsPage: MyFC = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [isPopupActive, setIsPopupActive] = useState<boolean>(false);

  const [sort, setSort] = useState<IProjectSortOption['value'] | ''>('');
  const [query, setQuery] = useState<string>('');

  const searchedAndSortedProjects = useSortedAndSearchedProjects(
    projects,
    sort,
    query
  );

  const onCreateProjectClick = function (project: IProject) {
    setProjects([project, ...projects]);
    setIsPopupActive(false);
  };

  const [isLoading, error] = useFetchProjects(setProjects);
  const createFormMethods = getFormMethods(setIsPopupActive);
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
      <div className="projects-content">
        {searchedAndSortedProjects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </div>
      <PopupTemplate
        active={isPopupActive}
        onHideHandler={createFormMethods.onHideCreateForm}
        className="project-popup__wrapper"
      >
        <CreateProjectForm addProject={onCreateProjectClick} />
      </PopupTemplate>
    </div>
  );
};

export default ProjectsPage;

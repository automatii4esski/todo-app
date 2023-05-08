import React, { useState, useEffect } from 'react';
import MyButton from '../components/UI/button/MyButton';
import DateElement from '../components/UI/date/DateElement';
import { getDate } from '../utils/getDate';
import ProgressLine from '../components/UI/progressLine/ProgressLine';
import ProjectItem from '../components/ProjectItem';
import { IProject, MyFC } from '../types/types';
import { useFetch } from '../hooks/useFetch';
import { ProjectService } from '../API/ProjectService';
import MyInput from '../components/UI/Input/MyInput';
import MySelect from '../components/UI/select/MySelect';
import PopupTemplate from '../components/UI/popup/PopupTemplate';
import CreateProjectForm from '../components/CreateProjectForm';

const ProjectsPage: MyFC = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [isPopupActive, setIsPopupActive] = useState<boolean>(false);

  const [fetchProjects, isLoading, error] = useFetch(async () => {
    const response = await ProjectService.getAll();
    setProjects(response.data);
  });

  const addProject = function (project: IProject) {
    setProjects([project, ...projects]);
    setIsPopupActive(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="projects">
      <div className="projects-top">
        <MyInput className="projects-top__item" placeholder="Search" />
        <MySelect
          onChange={() => {}}
          className="projects-top__item"
          sort=""
          options={[{ value: 'nothing', text: 'asd' }]}
        />
        <MyButton
          onClick={() => {
            setIsPopupActive(true);
          }}
          className="projects-top__item"
        >
          Create Project
        </MyButton>
      </div>
      <div className="projects-content">
        {projects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </div>
      <PopupTemplate
        active={isPopupActive}
        onHideHandler={() => {}}
        className="project-popup__wrapper"
      >
        <CreateProjectForm addProject={addProject} />
      </PopupTemplate>
    </div>
  );
};

export default ProjectsPage;

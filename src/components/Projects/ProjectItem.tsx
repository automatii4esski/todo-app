import React from 'react';
import ProgressLine from '../UI/progressLine/ProgressLine';
import DateElement from '../UI/date/DateElement';
import MyButton from '../UI/button/MyButton';
import { getDate } from '../../utils/getDate';
import { MyFC, IProject } from '../../types/types';
import { Link } from 'react-router-dom';
import { cutString } from '../../utils/cutString';

interface IProjectItem {
  project: IProject;
}

const ProjectItem: MyFC<IProjectItem> = ({ project }) => {
  return (
    <div className="project-item">
      <h3 className="project-item__title">{project.title}</h3>
      <div className="project-item__content">
        <p className="project-item__desc">
          <span className="project-item__pre-desc">Description: </span>
          {cutString(project.desc, 100).stringSlice}
        </p>
        <ProgressLine
          width={(project.tasksDone / project.tasksTotal) * 100}
          count={`${project.tasksDone}/${project.tasksTotal}`}
        />
        <div className="project-item__bottom">
          <div className="project-item__deadline">
            Deadline:
            <DateElement className="project-item__deadline-date">
              {getDate(project.deadline)}
            </DateElement>
          </div>
          <Link to={`/projects/${project.id}`}>
            <MyButton>Open</MyButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;

import React from 'react';
import MyButton from '../components/UI/button/MyButton';
import DateElement from '../components/UI/date/DateElement';
import { getDate } from '../utils/getDate';

const ProjectsPage = () => {
  return (
    <div className="projects">
      <div className="project-item">
        <h3 className="project-item__title">Title</h3>
        <div className="project-item__content">
          <p className="project-item__desc">
            <span className="project-item__pre-desc">Description: </span>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium
            esse atque ut eveniet nihil nulla nemo ipsum amet cupiditate! Sed
            esse nobis voluptates inventore dolorum sint iure minus quas
            aliquam.
          </p>
          <div className="project-item__progress">
            <div className="project-item__progress-text">Progress</div>
            <div className="project-item__progress-count">1/10</div>
            <div className="project-item__progress-line"></div>
          </div>
          <div className="project-item__bottom">
            <div className="project-item__deadline">
              Deadline:
              <DateElement className="project-item__deadline-date">
                {getDate(Date.now())}
              </DateElement>
            </div>
            <MyButton>Open</MyButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
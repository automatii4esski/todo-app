import ProgressLine from '../UI/progressLine/ProgressLine';
import DateElement from '../UI/date/DateElement';
import MyButtonType from '../UI/button/MyButton';
import { getDate } from '../../utils/getDate';
import { MyFC } from '../../types/common';
import { Link } from 'react-router-dom';
import { cutString } from '../../utils/cutString';
import { IProjectItem } from '../../types/project';
import MyButton from '../UI/button/MyButton';
import { getProjectPriorityColor } from '../../utils/projects/getProjectPriorityColor';

const ProjectItem: MyFC<IProjectItem> = ({ project }) => {
  const desc = cutString(project.desc, 100).stringSlice;
  const date = getDate(project.deadline);

  const progressLineWidth = (project.tasksDone / project.tasksTotal) * 100;
  const progressLineCount = `${project.tasksDone}/${project.tasksTotal}`;
  return (
    <div className={`project-item project-item--${project.color}`}>
      <div
        className={`project-item__priority project-item__priority--${getProjectPriorityColor(
          project.priority
        )}`}
      >
        {project.priority}
      </div>
      <h3 className="project-item__title">{project.title}</h3>
      <div className="project-item__content">
        <p className="project-item__desc">
          <span className="project-item__pre-desc">Description: </span>
          {desc}
        </p>

        <ProgressLine
          className="project-item__progress"
          width={progressLineWidth}
          count={progressLineCount}
        />
        <div className="project-item__bottom">
          <div className="project-item__deadline">
            Deadline:
            <DateElement
              className={`project-item__deadline-date project-item__deadline-date--${project.color}`}
            >
              {date}
            </DateElement>
          </div>
          <Link to={`/projects/${project.id}`}>
            <MyButton className={`button--${project.color}`}>Open</MyButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;

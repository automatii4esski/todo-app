import React from 'react';
import { ITask, MyFC } from '../types/types';
import DateElement from './UI/date/DateElement';
import { ReactComponent as DoneIcon } from '../images/icons/done.svg';
import { ReactComponent as DeleteIcon } from '../images/icons/cross.svg';
import { cutString } from '../utils/cutString';
import { getDate } from '../utils/getDate';

interface ITaskComponent {
  limit: number;
  task: ITask;
}

type TaskProps = ITaskComponent;

const Task: MyFC<TaskProps> = ({ limit, task }) => {
  const taskDesc = cutString(task.desc, limit);

  return (
    <div className="task-item">
      <div className="task-item__header">
        <h4 className="task-item__title">{task.title}</h4>
        <button className="task-item__service"></button>
      </div>
      <p className="task-item__desc">{taskDesc.firstPart}</p>
      <div className="task-item__box">
        <DateElement>{getDate(task.date)}</DateElement>
        <div className="task-item__actions">
          <button className="task-item__btn task-item__done-btn">
            <DoneIcon />
          </button>
          <button className="task-item__btn task-item__delete-btn">
            <DeleteIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task;

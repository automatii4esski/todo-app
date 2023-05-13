import React, { useEffect, useState } from 'react';
import { ITask, MyFC } from '../../types/types';
import DateElement from '../UI/date/DateElement';
import { ReactComponent as DoneIcon } from '../../images/icons/done.svg';
import { ReactComponent as DeleteIcon } from '../../images/icons/cross.svg';
import { ReactComponent as ArrowLeftIcon } from '../../images/icons/arrow-left.svg';
import { ReactComponent as EditIcon } from '../../images/icons/edit.svg';
import { cutString } from '../../utils/cutString';
import { getDate } from '../../utils/getDate';
import RoundButton from '../UI/button/RoundButton';

interface ITaskComponent {
  limit: number;
  task: ITask;
  onDoneTask: (task: ITask) => void;
  onDeleteTask: (task: ITask) => void;
  onEditClickHandler: (task: ITask, set: (task: ITask) => void) => void;
  done?: {
    onReturnTask: (task: ITask) => void;
  };
}

type TaskProps = ITaskComponent;

const Task: MyFC<TaskProps> = ({
  limit,
  task,
  onDoneTask,
  onEditClickHandler,
  onDeleteTask,
  done,
}) => {
  const [desc, setDesc] = useState({
    textToShow: '',
    sliceString: '',
    isShow: false,
    subText: 'Show',
  });

  const [taskData, setTaskData] = useState<ITask>(task);
  useEffect(() => {
    const taskDesc = cutString(taskData.desc, limit);
    setDesc({
      textToShow: taskDesc.stringSlice,
      sliceString: taskDesc.stringSlice,
      isShow: taskDesc.isCutted,
      subText: 'Show',
    });
  }, [taskData]);

  return (
    <div className="task-item">
      <div className="task-item__header">
        <h4 className="task-item__title">{taskData.title}</h4>
        <button
          onClick={() => {
            onEditClickHandler(taskData, setTaskData);
          }}
          className="task-item__service"
        >
          <EditIcon />
        </button>
      </div>
      <p className="task-item__desc">
        {desc.textToShow}
        {desc.isShow && (
          <span
            className="task-item__sub-desc"
            onClick={() => {
              if (desc.subText === 'Show') {
                setDesc({
                  ...desc,
                  textToShow: taskData.desc,
                  subText: 'Hide',
                });
              } else {
                setDesc({
                  ...desc,
                  textToShow: desc.sliceString,
                  subText: 'Show',
                });
              }
            }}
          >
            {desc.subText}
          </span>
        )}
      </p>

      <div className="task-item__box">
        <DateElement>{getDate(taskData.date)}</DateElement>
        <div className="task-item__actions">
          {done ? (
            <RoundButton
              onClick={() => done.onReturnTask(taskData)}
              className="task-item__btn task-item__return-btn"
            >
              <ArrowLeftIcon />
            </RoundButton>
          ) : (
            <RoundButton
              onClick={() => onDoneTask(taskData)}
              className="task-item__btn task-item__done-btn"
            >
              <DoneIcon />
            </RoundButton>
          )}

          <RoundButton
            onClick={() => onDeleteTask(taskData)}
            className="task-item__btn task-item__delete-btn"
          >
            <DeleteIcon />
          </RoundButton>
        </div>
      </div>
    </div>
  );
};

export default Task;

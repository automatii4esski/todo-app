import React, { useEffect, useState } from 'react';
import { MyFC } from '../../types/common';
import DateElement from '../UI/date/DateElement';
import { ReactComponent as DoneIcon } from '../../images/icons/done.svg';
import { ReactComponent as DeleteIcon } from '../../images/icons/cross.svg';
import { ReactComponent as ArrowLeftIcon } from '../../images/icons/arrow-left.svg';
import { ReactComponent as EditIcon } from '../../images/icons/edit.svg';
import { cutString } from '../../utils/cutString';
import { getDate } from '../../utils/getDate';
import RoundButton from '../UI/button/RoundButton';
import { ITask, ITaskMethods, ITasks } from '../../types/tasks';
import { getWrappedMethods } from '../../utils/tasks/taskMethods';

interface ITaskComponent {
  limit: number;
  task: ITask;
  tasksArrName: keyof ITasks;
  taskMethods: ITaskMethods;
}

type TaskProps = ITaskComponent;

const Task: MyFC<TaskProps> = ({ limit, task, taskMethods, tasksArrName }) => {
  const [desc, setDesc] = useState({
    textToShow: '',
    sliceString: '',
    isShow: false,
    subText: 'Show',
  });

  const [taskData, setTaskData] = useState<ITask>(task);
  const wrappedMethods = getWrappedMethods(
    taskMethods,
    tasksArrName,
    taskData,
    setTaskData
  );
  const buttonToRender =
    tasksArrName === 'done' ? (
      <RoundButton
        onClick={wrappedMethods.onTaskReturnClick}
        className="task-item__btn task-item__return-btn"
      >
        <ArrowLeftIcon />
      </RoundButton>
    ) : (
      <RoundButton
        onClick={wrappedMethods.onTaskDoneClick}
        className="task-item__btn task-item__done-btn"
      >
        <DoneIcon />
      </RoundButton>
    );

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
          onClick={wrappedMethods.onTaskEditClick}
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
          {buttonToRender}
          <RoundButton
            onClick={wrappedMethods.onTaskDeleteClick}
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

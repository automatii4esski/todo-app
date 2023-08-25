import { useState } from 'react';
import { MyFC } from '../../types/common';
import DateElement from '../UI/date/DateElement';
import { ReactComponent as DoneIcon } from '../../images/icons/done.svg';
import { ReactComponent as DeleteIcon } from '../../images/icons/cross.svg';
import { ReactComponent as ArrowLeftIcon } from '../../images/icons/arrow-left.svg';
import { ReactComponent as EditIcon } from '../../images/icons/edit.svg';
import { getDate } from '../../utils/getDate';
import RoundButton from '../UI/button/RoundButton';
import { ITask, ITaskItem } from '../../types/tasks';
import { getWrappedMethods } from '../../utils/tasks/taskMethods';
import { useTaskDesc } from '../../hooks/tasks/useTaskDesc';

const Task: MyFC<ITaskItem> = ({ limit, task, taskMethods, tasksArrName }) => {
  const [taskData, setTaskData] = useState<ITask>(task);
  const [desc, setDesc] = useTaskDesc(taskData, limit);

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

  const onShowDescClick = function () {
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
  };

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
          <span className="task-item__sub-desc" onClick={onShowDescClick}>
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

import { ReactComponent as DoneIcon } from '../../images/icons/done.svg';
import { ReactComponent as DeleteIcon } from '../../images/icons/cross.svg';
import { ReactComponent as ArrowLeftIcon } from '../../images/icons/arrow-left.svg';
import { ReactComponent as EditIcon } from '../../images/icons/edit.svg';
import { MyFC } from '../../types/common';
import { ISingleProjectTask } from '../../types/singleProject';
import { ProgectTaskStatus } from '../../types/project';

const SingleProjectTask: MyFC<ISingleProjectTask> = ({
  task,
  getWrappedTaskMethods,
}) => {
  const methods = getWrappedTaskMethods(task);

  const buttonToRender: Record<ProgectTaskStatus, any> = {
    active: (
      <button
        onClick={methods.onTaskDoneClick}
        className="singleproject-microtasks__item-btn singleproject-microtasks__item-done"
      >
        <DoneIcon className="singleproject-microtasks__item-icon" />
      </button>
    ),
    done: (
      <button
        onClick={methods.onTaskReturnClick}
        className="singleproject-microtasks__item-btn singleproject-microtasks__item-return"
      >
        <ArrowLeftIcon className="singleproject-microtasks__item-icon" />
      </button>
    ),
  };

  return (
    <div
      className={`singleproject-microtasks__item singleproject-microtasks__item--${task.status}`}
    >
      <div className="singleproject-microtasks__item-content">
        <p className="singleproject-microtasks__item-desc">{task.desc}</p>
        <div
          className={`singleproject-microtasks__item-bottom singleproject-microtasks__item-bottom--${task.status}`}
        >
          <button
            onClick={methods.onTaskEditClick}
            className="singleproject-microtasks__item-edit"
          >
            Edit
            <EditIcon className="singleproject-microtasks__edit-icon" />
          </button>
        </div>
      </div>

      <div className="singleproject-microtasks__item-actions">
        {buttonToRender[task.status]}

        <button
          onClick={methods.onTaskDeleteClick}
          className="singleproject-microtasks__item-btn singleproject-microtasks__item-delete"
        >
          <DeleteIcon className="singleproject-microtasks__item-icon" />
        </button>
      </div>
    </div>
  );
};

export default SingleProjectTask;

import React, { HTMLAttributes, memo } from 'react';
import TaskItem from './TaskItem';
import { ITask, MyFC } from '../types/types';
import { getAdditionClassName } from '../utils/getClassName';
import Loader from './UI/loader/Loader';

type HeaderVariant = 'yellow' | 'green' | 'red';

interface ITaskColumn {
  title: string;
  tasks: ITask[];
  isLoading: boolean;
  small?: boolean;
  main?: boolean;
  headerVariant?: HeaderVariant;
}

type TaskColumnProps = ITaskColumn & HTMLAttributes<HTMLElement>;

const TaskColumn: MyFC<TaskColumnProps> = ({
  small,
  headerVariant,
  main,
  tasks,
  title,
  isLoading,
}) => {
  const limit = 100;
  console.log(title);

  return (
    <div className={getAdditionClassName('task-column', small, '--small')}>
      <div
        className={getAdditionClassName(
          'task-column__header',
          Boolean(headerVariant),
          `--${headerVariant}`
        )}
      >
        <h3 className="task-column__title">{title}</h3>
        <div className="task-column__actions">
          {main && (
            <button className="task-column__create-btn">Create task</button>
          )}
        </div>
      </div>
      <div className="task-column__content">
        {isLoading ? (
          <Loader />
        ) : tasks.length !== 0 ? (
          <div className="task-column__tasks-wrapper">
            {tasks.map((task) => (
              <TaskItem task={task} limit={limit} key={task.id}></TaskItem>
            ))}
          </div>
        ) : (
          <div className="task-column__tasks-plug">No Tasks</div>
        )}
      </div>
    </div>
  );
};

export default memo(TaskColumn);

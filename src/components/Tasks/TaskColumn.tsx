import { HTMLAttributes, memo } from 'react';
import TaskItem from './TaskItem';
import { MyFC } from '../../types/common';
import { getAdditionClassName } from '../../utils/getClassName';
import Loader from '../UI/loader/Loader';

import { ITaskColumn } from '../../types/tasks';
import TaskColumnHeader from './TaskColumnHeader';

type TaskColumnProps = ITaskColumn & HTMLAttributes<HTMLElement>;

const TaskColumn: MyFC<TaskColumnProps> = ({
  small,
  taskMethods,
  tasksArrName,
  headerVariant,
  main,
  tasks: inputTasks,
  options,
  query,
  stringLimit,
  sort,
  title,
  isLoading,
}) => {
  const tasks = inputTasks[tasksArrName];

  return (
    <div className={getAdditionClassName('task-column', small, '--small')}>
      <TaskColumnHeader
        headerVariant={headerVariant}
        options={options}
        tasksArrName={tasksArrName}
        main={main}
        tasksCount={tasks.length}
        query={query}
        sort={sort}
        title={title}
      />
      <div className="task-column__content">
        {isLoading ? (
          <Loader />
        ) : tasks.length !== 0 ? (
          <div className="task-column__tasks-wrapper">
            {tasks.map((task) => (
              <TaskItem
                taskMethods={taskMethods}
                tasksArrName={tasksArrName}
                task={task}
                limit={stringLimit}
                key={task.id}
              ></TaskItem>
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

import React, {
  ChangeEvent,
  HTMLAttributes,
  memo,
  useRef,
  useState,
} from 'react';
import TaskItem from './TaskItem';
import { ISortOption, ITask, MyFC } from '../../types/types';
import { getAdditionClassName } from '../../utils/getClassName';
import Loader from '../UI/loader/Loader';
import PopupTemplate from '../UI/popup/PopupTemplate';
import MyButton from '../UI/button/MyButton';
import MySelect from '../UI/select/MySelect';
import MyInput from '../UI/Input/MyInput';
import { useInput } from '../../hooks/useInput';

type HeaderVariant = 'yellow' | 'green' | 'red';

interface ITaskColumn {
  title: string;
  tasks: ITask[];
  isLoading: boolean;
  options: ISortOption[];
  onEditClickHandler: (task: ITask, set: (task: ITask) => void) => void;
  limit: number;
  onDoneTask: (task: ITask) => void;
  onDeleteTask: (task: ITask) => void;
  onSortChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  query: {
    set: (value: any) => void;
    value: string;
  };
  sort: string;
  small?: boolean;
  done?: {
    onReturnTask: (task: ITask) => void;
  };
  main?: {
    createTaskHandler: () => void;
    isPopupActive: boolean;
  };
  headerVariant?: HeaderVariant;
}

type TaskColumnProps = ITaskColumn & HTMLAttributes<HTMLElement>;

const TaskColumn: MyFC<TaskColumnProps> = ({
  small,
  headerVariant,
  main,
  tasks,
  options,
  onSortChange,
  query,
  limit,
  sort,
  onEditClickHandler,
  title,
  isLoading,
  onDoneTask,
  onDeleteTask,
  done,
}) => {
  return (
    <div className={getAdditionClassName('task-column', small, '--small')}>
      <div
        className={getAdditionClassName(
          'task-column__header',
          Boolean(headerVariant),
          `--${headerVariant}`
        )}
      >
        <h3 className="task-column__title">{title + ` (${tasks.length})`}</h3>
        <div className="task-column__actions">
          <MyInput
            placeholder="Search"
            value={query.value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              query.set(e.target.value.toLowerCase());
            }}
            className="task-column__search"
          />

          <MySelect
            className="task-column__sort"
            sort={sort}
            onChange={onSortChange}
            options={options}
          />
          {main && (
            <>
              <MyButton
                onClick={main.createTaskHandler}
                className="task-column__create-btn"
              >
                Create Task
              </MyButton>
            </>
          )}
        </div>
      </div>
      <div className="task-column__content">
        {isLoading ? (
          <Loader />
        ) : tasks.length !== 0 ? (
          <div className="task-column__tasks-wrapper">
            {tasks.map((task) => (
              <TaskItem
                onDoneTask={onDoneTask}
                onDeleteTask={onDeleteTask}
                done={done}
                onEditClickHandler={onEditClickHandler}
                task={task}
                limit={limit}
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

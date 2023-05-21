import React, { ChangeEvent } from 'react';
import MyInput from '../UI/Input/MyInput';
import MySelect from '../UI/select/MySelect';
import MyButton from '../UI/button/MyButton';
import {
  HeaderVariant,
  ITaskColumnHeader,
  ITaskQueryObj,
  ITaskSortObj,
  ITaskSortOption,
  ITasks,
} from '../../types/tasks';
import { ISortOption, MyFC } from '../../types/common';
import { getAdditionClassName } from '../../utils/getClassName';

const TaskColumnHeader: MyFC<ITaskColumnHeader> = ({
  tasksArrName,
  tasksCount,
  title,
  query,
  options,
  sort,
  headerVariant,
  main,
}) => {
  const onSearchQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    query[tasksArrName].set(e.target.value.toLowerCase());
  };

  const onSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    sort[tasksArrName].set(
      e.target.value.toLowerCase() as ITaskSortOption['value']
    );
  };

  const sortValue = sort[tasksArrName].value;
  const queryValue = query[tasksArrName].value;

  return (
    <div
      className={getAdditionClassName(
        'task-column__header',
        Boolean(headerVariant),
        `--${headerVariant}`
      )}
    >
      <h3 className="task-column__title">{title + ` (${tasksCount})`}</h3>
      <div className="task-column__actions">
        <MyInput
          placeholder="Search"
          value={queryValue}
          onChange={onSearchQueryChange}
          className="task-column__search"
        />

        <MySelect
          className="task-column__sort"
          sort={sortValue}
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
  );
};

export default TaskColumnHeader;

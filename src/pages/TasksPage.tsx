import React, { useEffect, ChangeEvent, useMemo, useState } from 'react';
import { ISortOption, MyFC } from '../types/common';
import {
  ITask,
  ITaskEditState,
  ITaskSortOption,
  ITasks,
  ITaskMethods,
  SetTasksHelper,
} from '../types/tasks';
import TaskColumn from '../components/Tasks/TaskColumn';
import { TaskService } from '../API/TaskService';
import { useSearchedAndSortedTasks } from '../hooks/tasks/useFilterTasks';
import PopupTemplate from '../components/UI/popup/PopupTemplate';
import CreateTaskForm from '../components/CreateForms/CreateTaskForm';
import { isOutdate } from '../utils/isOutdate';
import EditTaskForm from '../components/CreateForms/EditTaskForm';
import { initTaskEditState } from '../initValues/tasks';
import { getMethods } from '../utils/tasks/taskMethods';
import {
  useFetchTasks,
  useQuery,
  useSort,
  useTasks,
} from '../hooks/tasks/useData';
import { getFormMethods } from '../utils/tasks/formMethods';

const sortOptions: ITaskSortOption[] = [
  {
    value: 'date',
    text: 'By date',
  },
  {
    value: 'title',
    text: 'By title',
  },
  {
    value: 'desc',
    text: 'By desc',
  },
];

const TasksPage: MyFC = () => {
  const [sort, setSort] = useSort();

  const [query, setQuery] = useQuery();

  const [tasks, setTasks] = useTasks();

  const tasksSortedAndSearched: ITasks = {
    outdated: useSearchedAndSortedTasks(
      tasks.outdated,
      sort.outdated,
      query.outdated
    ),
    inProgress: useSearchedAndSortedTasks(
      tasks.inProgress,
      sort.inProgress,
      query.inProgress
    ),
    done: useSearchedAndSortedTasks(tasks.done, sort.done, query.done),
  };

  const [isTasksLoading, tasksError] = useFetchTasks(setTasks);

  const setTasksHelper: SetTasksHelper = function (...inputTasks) {
    const newTasks = {
      ...tasks,
    };
    inputTasks.forEach((data) => {
      newTasks[data[0]] = data[1];
    });
    setTasks(newTasks);
  };

  const [isCreatePopupActive, setIsCreatePopupActive] =
    useState<boolean>(false);

  const [isEditPopupActive, setIsEditPopupActive] = useState<boolean>(false);

  const [taskEditState, setTaskEditState] =
    useState<ITaskEditState>(initTaskEditState);

  const taskMethods: ITaskMethods = getMethods(
    tasks,
    setTasksHelper,
    setIsEditPopupActive,
    setTaskEditState
  );

  const formMethods = getFormMethods(
    tasks,
    tasksSortedAndSearched,
    setTasksHelper,
    setIsEditPopupActive,
    setIsCreatePopupActive,
    setTaskEditState,
    taskEditState
  );

  const onCreateTaskClick = function () {
    setIsCreatePopupActive(true);
  };

  return (
    <div className="task">
      <TaskColumn
        tasks={tasksSortedAndSearched.outdated}
        title="Outdated"
        tasksArrName="outdated"
        taskMethods={taskMethods}
        onSortChange={(e) => {
          setSort({
            ...sort,
            outdated: e.target.value as ITaskSortOption['value'],
          });
        }}
        query={{
          value: query.outdated,
          set: (value: string) => {
            setQuery({
              ...query,
              outdated: value,
            });
          },
        }}
        limit={50}
        sort={sort.outdated}
        options={sortOptions}
        isLoading={isTasksLoading}
        small
        headerVariant="red"
      />
      <TaskColumn
        options={sortOptions}
        tasksArrName="inProgress"
        taskMethods={taskMethods}
        query={{
          value: query.inProgress,
          set: (value: string) => {
            setQuery({
              ...query,
              inProgress: value,
            });
          },
        }}
        limit={100}
        sort={sort.inProgress}
        onSortChange={(e) => {
          setSort({
            ...sort,
            inProgress: e.target.value as ITaskSortOption['value'],
          });
        }}
        tasks={tasksSortedAndSearched.inProgress}
        isLoading={isTasksLoading}
        title="In Progress"
        main={{
          createTaskHandler: onCreateTaskClick,
          isPopupActive: isCreatePopupActive,
        }}
        headerVariant="yellow"
      />

      <TaskColumn
        isLoading={isTasksLoading}
        tasksArrName="done"
        taskMethods={taskMethods}
        sort={sort.done}
        query={{
          value: query.done,
          set: (value: string) => {
            setQuery({
              ...query,
              done: value,
            });
          },
        }}
        limit={50}
        onSortChange={(e) => {
          setSort({
            ...sort,
            done: e.target.value as ITaskSortOption['value'],
          });
        }}
        options={sortOptions}
        tasks={tasksSortedAndSearched.done}
        title="Done"
        small
        headerVariant="green"
      />
      <PopupTemplate
        onHideHandler={() => {
          setIsCreatePopupActive(false);
        }}
        className="task__popup-wrapper"
        active={isCreatePopupActive}
      >
        {<CreateTaskForm onSubmit={formMethods.onSubmitCreateForm} />}
      </PopupTemplate>
      <PopupTemplate
        onHideHandler={() => {
          setIsEditPopupActive(false);
        }}
        className="task__popup-wrapper"
        active={isEditPopupActive}
      >
        {
          <EditTaskForm
            task={taskEditState?.value}
            onSubmit={formMethods.onSubmitEditForm}
          />
        }
      </PopupTemplate>
    </div>
  );
};

export default TasksPage;

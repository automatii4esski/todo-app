import React, { useState } from 'react';
import { MyFC } from '../types/common';
import {
  ITaskEditState,
  ITaskSortOption,
  ITaskMethods,
  SetTasksHelper,
} from '../types/tasks';
import TaskColumn from '../components/Tasks/TaskColumn';
import PopupTemplate from '../components/UI/popup/PopupTemplate';
import CreateTaskForm from '../components/CreateForms/CreateTaskForm';
import EditTaskForm from '../components/CreateForms/EditTaskForm';
import { initTaskEditState } from '../initValues/tasks';
import { getMethods } from '../utils/tasks/taskMethods';
import {
  useFetchTasks,
  useFilteredTasks,
  useTasks,
} from '../hooks/tasks/useTasksData';
import { useQuery, useSort } from '../hooks/tasks/useFilterData';
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
  const sort = useSort();

  const query = useQuery();

  const [tasks, setTasks] = useTasks();

  const tasksSortedAndSearched = useFilteredTasks(tasks, sort, query);

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

  const mainObj = {
    createTaskHandler: onCreateTaskClick,
    isPopupActive: isCreatePopupActive,
  };

  return (
    <div className="task">
      <TaskColumn
        tasks={tasksSortedAndSearched}
        title="Outdated"
        tasksArrName="outdated"
        taskMethods={taskMethods}
        onSortChange={sort}
        query={query}
        stringLimit={50}
        sort={sort}
        options={sortOptions}
        isLoading={isTasksLoading}
        small
        headerVariant="red"
      />
      <TaskColumn
        options={sortOptions}
        tasksArrName="inProgress"
        taskMethods={taskMethods}
        query={query}
        stringLimit={100}
        sort={sort}
        tasks={tasksSortedAndSearched}
        isLoading={isTasksLoading}
        title="In Progress"
        main={mainObj}
        headerVariant="yellow"
      />

      <TaskColumn
        isLoading={isTasksLoading}
        tasksArrName="done"
        taskMethods={taskMethods}
        sort={sort}
        query={query}
        stringLimit={50}
        options={sortOptions}
        tasks={tasksSortedAndSearched}
        title="Done"
        small
        headerVariant="green"
      />
      <PopupTemplate
        onHideHandler={formMethods.onHideCreateForm}
        className="task__popup-wrapper"
        active={isCreatePopupActive}
      >
        {<CreateTaskForm onSubmit={formMethods.onSubmitCreateForm} />}
      </PopupTemplate>
      <PopupTemplate
        onHideHandler={formMethods.onHideEditForm}
        className="task__popup-wrapper"
        active={isEditPopupActive}
      >
        {
          <EditTaskForm
            task={taskEditState.value}
            onSubmit={formMethods.onSubmitEditForm}
          />
        }
      </PopupTemplate>
    </div>
  );
};

export default TasksPage;

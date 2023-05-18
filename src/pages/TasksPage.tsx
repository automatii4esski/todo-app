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
import { getConcatClassName } from '../utils/getClassName';
import { TaskService } from '../API/TaskService';
import { useFetch } from '../hooks/useFetch';
import {
  useSortedTasks,
  useSearchedAndSortedTasks,
} from '../hooks/tasks/useFilterTasks';
import PopupTemplate from '../components/UI/popup/PopupTemplate';
import CreateTaskForm from '../components/CreateForms/CreateTaskForm';
import { isOutdate } from '../utils/isOutdate';
import { distributeTasks } from '../utils/tasks/distributeTasks';
import EditTaskForm from '../components/CreateForms/EditTaskForm';
import { initTaskEditState } from '../initValues/tasks';
import { getMethods } from '../utils/tasks/taskMethods';
import { useQuery, useSort, useTasks } from '../hooks/tasks/useData';

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

  const [fetchTasks, isTasksLoading, tasksError] = useFetch(async () => {
    const response = await TaskService.getAll();
    const [outdated, inProgress, done] = distributeTasks(response.data);

    setTasks({
      outdated: outdated,
      inProgress: inProgress,
      done: done,
    });
  });

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

  const onTaskReturnClick = function () {
    return (taskToInteract: ITask) => {
      const taskName = isOutdate(taskToInteract.date)
        ? 'outdated'
        : 'inProgress';
      const newTasks = [taskToInteract, ...tasks[taskName]];
      const newCurTasks = tasks.done.filter(
        (task) => task.id !== taskToInteract.id
      );

      setTasksHelper([taskName, newTasks], ['done', newCurTasks]);

      taskToInteract.status = 'active';
      TaskService.put(taskToInteract);
    };
  };

  const onSubmitCreateForm = function (task: ITask) {
    const taskName = isOutdate(task.date) ? 'outdated' : 'inProgress';
    const newTasks = [task, ...tasks[taskName]];

    setTasksHelper([taskName, newTasks]);
    setIsCreatePopupActive(false);
    TaskService.post(task);
  };

  const onSubmitEditForm = function (taskToInteract: ITask) {
    setIsEditPopupActive(false);
    taskEditState!.set(taskToInteract);
    setTaskEditState(initTaskEditState);
    TaskService.put(taskToInteract);

    if (taskToInteract.status === 'done') return;

    const isNewTaskOutdate = isOutdate(taskToInteract.date);

    if (
      (isNewTaskOutdate && taskEditState!.taskName === 'outdated') ||
      (!isNewTaskOutdate && taskEditState!.taskName === 'inProgress')
    )
      return;

    const newCurTasks = tasksSortedAndSearched[taskEditState!.taskName].filter(
      (task) => task.id !== taskToInteract.id
    );
    const newTaskName = isNewTaskOutdate ? 'outdated' : 'inProgress';

    const newAnotherTasks = [taskToInteract, ...tasks[newTaskName]];

    setTasksHelper(
      [taskEditState!.taskName, newCurTasks],
      [newTaskName, newAnotherTasks]
    );
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTaskHandler = function () {
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
          createTaskHandler,
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
        done={{
          onReturnTask: onTaskReturnClick(),
        }}
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
        {<CreateTaskForm onSubmit={onSubmitCreateForm} />}
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
            onSubmit={onSubmitEditForm}
          />
        }
      </PopupTemplate>
    </div>
  );
};

export default TasksPage;

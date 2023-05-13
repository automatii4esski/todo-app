import React, { useEffect, ChangeEvent, useMemo, useState } from 'react';
import { ISortOption, ITask, ITaskSortOption, MyFC } from '../types/types';
import TaskColumn from '../components/Tasks/TaskColumn';
import { getConcatClassName } from '../utils/getClassName';
import { TaskService } from '../API/TaskService';
import { useFetch } from '../hooks/useFetch';
import { useSortedTasks, useTasks } from '../hooks/useTasks';
import PopupTemplate from '../components/UI/popup/PopupTemplate';
import CreateTaskForm from '../components/CreateForms/CreateTaskForm';
import { isOutdate } from '../utils/isOutdate';
import { distributeTasks } from '../utils/distributeTasks';
import EditTaskForm from '../components/CreateForms/EditTaskForm';

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

interface ITasks {
  outdated: ITask[];
  inProgress: ITask[];
  done: ITask[];
}

const TasksPage: MyFC = () => {
  const [sort, setSort] = useState({
    outdated: '' as ITaskSortOption['value'],
    inProgress: '' as ITaskSortOption['value'],
    done: '' as ITaskSortOption['value'],
  });

  const [query, setQuery] = useState({
    outdated: '',
    inProgress: '',
    done: '',
  });

  const [tasks, setTasks] = useState<ITasks>({
    outdated: [],
    inProgress: [],
    done: [],
  });

  const tasksSortedAndSearched: ITasks = {
    outdated: useTasks(tasks.outdated, sort.outdated, query.outdated),
    inProgress: useTasks(tasks.inProgress, sort.inProgress, query.inProgress),
    done: useTasks(tasks.done, sort.done, query.done),
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

  const setTasksHelper = function (
    names: Array<keyof ITasks>,
    tasksArrays: Array<ITask[]>
  ) {
    const newObj = {
      ...tasks,
    };
    names.forEach((name, i) => {
      newObj[name] = tasksArrays[i];
    });
    setTasks(newObj);
  };

  const [isCreatePopupActive, setIsCreatePopupActive] =
    useState<boolean>(false);
  const [isEditPopupActive, setIsEditPopupActive] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<{
    value: ITask;
    set: (task: ITask) => void;
    taskName: keyof typeof tasks;
  } | null>(null);

  const onReturnTask = function () {
    return (taskToInteract: ITask) => {
      const taskName = isOutdate(taskToInteract.date)
        ? 'outdated'
        : 'inProgress';
      const newTasks = [taskToInteract, ...tasks[taskName]];
      const newCurTasks = tasks.done.filter(
        (task) => task.id !== taskToInteract.id
      );
      setTasksHelper([taskName, 'done'], [newTasks, newCurTasks]);

      taskToInteract.status = 'active';
      TaskService.put(taskToInteract);
    };
  };

  const onDeleteTask = function (
    currentTasksArr: ITask[],
    taskName: keyof typeof tasks
  ) {
    return (taskToInteract: ITask) => {
      const newCurTasks = currentTasksArr.filter(
        (task) => task.id !== taskToInteract.id
      );
      setTasksHelper([taskName], [newCurTasks]);
      TaskService.delete(taskToInteract);
    };
  };

  const onDoneTask = function (
    currentTasksArr: ITask[],
    taskName: keyof typeof tasks
  ) {
    return (taskToInteract: ITask) => {
      const newTasks = [taskToInteract, ...tasks.done];
      const newCurTasks = currentTasksArr.filter(
        (task) => task.id !== taskToInteract.id
      );
      setTasksHelper(['done', taskName], [newTasks, newCurTasks]);

      taskToInteract.status = 'done';
      TaskService.put(taskToInteract);
    };
  };

  const onCreateSubmit = function (task: ITask) {
    const taskName = isOutdate(task.date) ? 'outdated' : 'inProgress';
    const newTasks = [task, ...tasks[taskName]];

    setTasksHelper([taskName], [newTasks]);
    setIsCreatePopupActive(false);
    TaskService.post(task);
  };

  const onEditClickHandler = function name(taskName: keyof typeof tasks) {
    return (task: ITask, setTask: (task: ITask) => void) => {
      setIsEditPopupActive(true);
      setEditTask({ value: task, set: setTask, taskName });
    };
  };

  const onEditSubmit = function (taskToInteract: ITask) {
    setIsEditPopupActive(false);
    editTask!.set(taskToInteract);
    setEditTask(null);
    TaskService.put(taskToInteract);

    if (taskToInteract.status === 'done') return;

    const isNewTaskOutdate = isOutdate(taskToInteract.date);

    if (
      (isNewTaskOutdate && editTask!.taskName === 'outdated') ||
      (!isNewTaskOutdate && editTask!.taskName === 'inProgress')
    )
      return;

    const newCurTasks = tasksSortedAndSearched[editTask!.taskName].filter(
      (task) => task.id !== taskToInteract.id
    );
    const newTaskName = isNewTaskOutdate ? 'outdated' : 'inProgress';

    const newAnotherTasks = [taskToInteract, ...tasks[newTaskName]];

    setTasksHelper(
      [editTask!.taskName, newTaskName],
      [newCurTasks, newAnotherTasks]
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
        onDoneTask={onDoneTask(tasksSortedAndSearched.outdated, 'outdated')}
        onDeleteTask={onDeleteTask(tasksSortedAndSearched.outdated, 'outdated')}
        isLoading={isTasksLoading}
        small
        headerVariant="red"
        onEditClickHandler={onEditClickHandler('outdated')}
      />
      <TaskColumn
        options={sortOptions}
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
        onEditClickHandler={onEditClickHandler('inProgress')}
        sort={sort.inProgress}
        onSortChange={(e) => {
          setSort({
            ...sort,
            inProgress: e.target.value as ITaskSortOption['value'],
          });
        }}
        tasks={tasksSortedAndSearched.inProgress}
        onDoneTask={onDoneTask(tasks.inProgress, 'inProgress')}
        onDeleteTask={onDeleteTask(tasks.inProgress, 'inProgress')}
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
        sort={sort.done}
        onEditClickHandler={onEditClickHandler('done')}
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
        onDoneTask={onDoneTask(tasks.done, 'done')}
        onDeleteTask={onDeleteTask(tasks.done, 'done')}
        done={{
          onReturnTask: onReturnTask(),
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
        {<CreateTaskForm onSubmit={onCreateSubmit} />}
      </PopupTemplate>
      <PopupTemplate
        onHideHandler={() => {
          setIsEditPopupActive(false);
        }}
        className="task__popup-wrapper"
        active={isEditPopupActive}
      >
        {<EditTaskForm task={editTask?.value} onSubmit={onEditSubmit} />}
      </PopupTemplate>
    </div>
  );
};

export default TasksPage;

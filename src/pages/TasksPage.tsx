import React, { useEffect, ChangeEvent, useMemo, useState } from 'react';
import { ISortOption, ITask, ITaskSortOption, MyFC } from '../types/types';
import TaskColumn from '../components/TaskColumn';
import { getConcatClassName } from '../utils/getClassName';
import { TaskService } from '../API/TaskService';
import { useFetch } from '../hooks/useFetch';
import { useSortedTasks } from '../hooks/useTasks';
import PopupTemplate from '../components/UI/popup/PopupTemplate';
import CreateTaskForm from '../components/CreateTaskForm';
import { isOutdate } from '../utils/isOutdate';
import { distributeTasks } from '../utils/distributeTasks';

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

  const [tasks, setTasks] = useState<ITasks>({
    outdated: [],
    inProgress: [],
    done: [],
  });

  const tasksSorted: ITasks = {
    outdated: useSortedTasks(tasks.outdated, sort.outdated),
    inProgress: useSortedTasks(tasks.inProgress, sort.inProgress),
    done: useSortedTasks(tasks.done, sort.done),
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

  const [isPopupActive, setIsPopupActive] = useState<boolean>(false);

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

  const onSubmit = function (task: ITask) {
    const taskName = isOutdate(task.date) ? 'outdated' : 'inProgress';
    const newTasks = [task, ...tasks[taskName]];

    setTasksHelper([taskName], [newTasks]);
    setIsPopupActive(false);
    TaskService.post(task);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTaskHandler = function () {
    setIsPopupActive(true);
  };

  return (
    <div className="task">
      <TaskColumn
        tasks={tasksSorted.outdated}
        title="Outdated"
        onSortChange={(e) => {
          setSort({
            ...sort,
            outdated: e.target.value as ITaskSortOption['value'],
          });
        }}
        sort={sort.outdated}
        options={sortOptions}
        onDoneTask={onDoneTask(tasksSorted.outdated, 'outdated')}
        onDeleteTask={onDeleteTask(tasksSorted.outdated, 'outdated')}
        isLoading={isTasksLoading}
        small
        headerVariant="red"
      />
      <TaskColumn
        options={sortOptions}
        sort={sort.inProgress}
        onSortChange={(e) => {
          setSort({
            ...sort,
            inProgress: e.target.value as ITaskSortOption['value'],
          });
        }}
        tasks={tasksSorted.inProgress}
        onDoneTask={onDoneTask(tasks.inProgress, 'inProgress')}
        onDeleteTask={onDeleteTask(tasks.inProgress, 'inProgress')}
        isLoading={isTasksLoading}
        title="In Progress"
        main={{
          createTaskHandler,
          isPopupActive,
        }}
        headerVariant="yellow"
      />

      <TaskColumn
        isLoading={isTasksLoading}
        sort={sort.done}
        onSortChange={(e) => {
          setSort({
            ...sort,
            done: e.target.value as ITaskSortOption['value'],
          });
        }}
        options={sortOptions}
        tasks={tasksSorted.done}
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
          setIsPopupActive(false);
        }}
        className="task__popup-wrapper"
        active={isPopupActive}
      >
        {<CreateTaskForm onSubmit={onSubmit} />}
      </PopupTemplate>
    </div>
  );
};

export default TasksPage;

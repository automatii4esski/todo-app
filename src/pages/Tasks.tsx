import React, { useEffect, ChangeEvent, useMemo, useState } from 'react';
import { ISortOption, ITask, MyFC } from '../types/types';
import TaskColumn from '../components/TaskColumn';
import { getConcatClassName } from '../utils/getClassName';
import { TaskService } from '../API/TaskService';
import { useFetch } from '../hooks/useFetch';
import { useSortedTasks } from '../hooks/useTasks';
import PopupTemplate from '../components/UI/popup/PopupTemplate';
import CreateTaskForm from '../components/CreateTaskForm';
import { isOutdate } from '../utils/isOutdate';

interface ITaskSortOption extends ISortOption {
  value: keyof Pick<ITask, 'title' | 'desc' | 'date'>;
  text: string;
}

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

const Tasks: MyFC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [doneTasks, setDoneTasks] = useState<ITask[]>([]);
  const [outdatedTasks, setOIutdatedTasks] = useState<ITask[]>([]);
  const [inProgressTasks, setInProgressTasks] = useState<ITask[]>([]);

  const [fetchTasks, isTasksLoading, tasksError] = useFetch(async () => {
    const response = await TaskService.getAll();
    setTasks(response.data);
    const done: ITask[] = [];
    const outdated: ITask[] = [];
    const inProgress: ITask[] = [];

    response.data.forEach((task) => {
      if (task.status === 'done') {
        done.push(task);
      } else {
        isOutdate(task.date) ? outdated.push(task) : inProgress.push(task);
      }
    });
    setDoneTasks(done);
    setOIutdatedTasks(outdated);
    setInProgressTasks(inProgress);
  });
  const [outdatedSort, setOutdatedSort] = useState<
    ITaskSortOption['value'] | string
  >('');
  const [doneSort, setDoneSort] = useState<ITaskSortOption['value'] | string>(
    ''
  );
  const [inProgressSort, setInProgressSort] = useState<
    ITaskSortOption['value'] | string
  >('');

  const outdatedTasksArr = useSortedTasks(outdatedTasks, outdatedSort);
  const inProgressTasksArr = useSortedTasks(inProgressTasks, inProgressSort);
  const doneTasksArr = useSortedTasks(doneTasks, doneSort);

  const [isPopupActive, setIsPopupActive] = useState<boolean>(false);

  const onReturnTask = function (
    currentTasksArr: ITask[],
    setCurrentTasks: (newArr: ITask[]) => any
  ) {
    return (taskToInteract: ITask) => {
      setCurrentTasks(
        currentTasksArr.filter((task) => task.id !== taskToInteract.id)
      );
      let newTasks;
      if (isOutdate(taskToInteract.date)) {
        newTasks = [taskToInteract, ...outdatedTasks];
        setOIutdatedTasks(newTasks);
      } else {
        newTasks = [taskToInteract, ...inProgressTasks];
        setInProgressTasks(newTasks);
      }
      taskToInteract.status = 'active';
      TaskService.put(taskToInteract);
    };
  };

  const onDeleteTask = function (
    currentTasksArr: ITask[],
    setCurrentTasks: (newArr: ITask[]) => any
  ) {
    return (taskToInteract: ITask) => {
      setCurrentTasks(
        currentTasksArr.filter((task) => task.id !== taskToInteract.id)
      );
      TaskService.delete(taskToInteract);
    };
  };

  const onDoneTask = function (
    currentTasksArr: ITask[],
    setCurrentTasks: (newArr: ITask[]) => any
  ) {
    return (taskToInteract: ITask) => {
      const newTasks = [taskToInteract, ...doneTasks];
      setDoneTasks(newTasks);
      setCurrentTasks(
        currentTasksArr.filter((task) => task.id !== taskToInteract.id)
      );
      taskToInteract.status = 'done';
      TaskService.put(taskToInteract);
    };
  };

  const onSortChange = function (
    tasks: ITask[],
    setSort: (sort: ITaskSortOption['value']) => void
  ) {
    return (e: ChangeEvent<HTMLSelectElement>) => {
      const sort = e.target.value as ITaskSortOption['value'];
      tasks.sort((a, b) => {
        if (a[sort] < b[sort]) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
      setSort(sort);
    };
  };

  const onSubmit = function (task: ITask) {
    let newTasks;
    if (isOutdate(task.date)) {
      newTasks = [task, ...outdatedTasks];
      setOIutdatedTasks(newTasks);
    } else {
      newTasks = [task, ...inProgressTasks];
      setInProgressTasks(newTasks);
    }
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
        tasks={outdatedTasks}
        title="Outdated"
        onSortChange={onSortChange(outdatedTasks, setOutdatedSort)}
        sort={outdatedSort}
        options={sortOptions}
        onDoneTask={onDoneTask(outdatedTasks, setOIutdatedTasks)}
        onDeleteTask={onDeleteTask(outdatedTasks, setOIutdatedTasks)}
        isLoading={isTasksLoading}
        small
        headerVariant="red"
      />
      <TaskColumn
        options={sortOptions}
        sort={inProgressSort}
        onSortChange={onSortChange(inProgressTasks, setInProgressSort)}
        tasks={inProgressTasks}
        onDoneTask={onDoneTask(inProgressTasks, setInProgressTasks)}
        onDeleteTask={onDeleteTask(inProgressTasks, setInProgressTasks)}
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
        sort={doneSort}
        onSortChange={onSortChange(doneTasks, setDoneSort)}
        options={sortOptions}
        tasks={doneTasks}
        onDoneTask={onDoneTask(doneTasks, setDoneTasks)}
        onDeleteTask={onDeleteTask(doneTasks, setDoneTasks)}
        done={{
          onReturnTask: onReturnTask(doneTasks, setDoneTasks),
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

export default Tasks;

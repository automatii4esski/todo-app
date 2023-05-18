import { TaskService } from '../../API/TaskService';
import { ITaskMethods } from '../../types/tasks';
import { ITask, ITaskEditState } from '../../types/tasks';
import { ITasks, SetTasksHelper } from '../../types/tasks';
import { isOutdate } from '../isOutdate';

const onTaskDeleteClick = function (
  tasks: ITasks,
  setTasksHelper: SetTasksHelper
) {
  return (tasksName: keyof ITasks, taskToInteract: ITask) => {
    const newCurTasks = tasks[tasksName].filter(
      (task) => task.id !== taskToInteract.id
    );
    setTasksHelper([tasksName, newCurTasks]);
    TaskService.delete(taskToInteract);
  };
};

const onTaskDoneClick = function (
  tasks: ITasks,
  setTasksHelper: SetTasksHelper
) {
  return (tasksName: keyof ITasks, taskToInteract: ITask) => {
    const newTasks = [taskToInteract, ...tasks.done];
    const newCurTasks = tasks[tasksName].filter(
      (task) => task.id !== taskToInteract.id
    );
    setTasksHelper(['done', newTasks], [tasksName, newCurTasks]);

    taskToInteract.status = 'done';
    TaskService.put(taskToInteract);
  };
};

const onTaskReturnClick = function (
  tasks: ITasks,
  setTasksHelper: SetTasksHelper
) {
  return (taskToInteract: ITask) => {
    const taskName = isOutdate(taskToInteract.date) ? 'outdated' : 'inProgress';
    const newTasks = [taskToInteract, ...tasks[taskName]];
    const newCurTasks = tasks.done.filter(
      (task) => task.id !== taskToInteract.id
    );

    setTasksHelper([taskName, newTasks], ['done', newCurTasks]);

    taskToInteract.status = 'active';
    TaskService.put(taskToInteract);
  };
};

const onTaskEditClick = function name(
  setIsEditPopupActive: (isActive: boolean) => void,
  setTaskEditState: (editState: ITaskEditState) => void
) {
  return (
    tasksName: keyof ITasks,
    taskToInteract: ITask,
    setTask: (task: ITask) => void
  ) => {
    setIsEditPopupActive(true);
    setTaskEditState({
      value: taskToInteract,
      set: setTask,
      taskName: tasksName,
    });
  };
};

export const getMethods = function (
  tasks: ITasks,
  setTasksHelper: SetTasksHelper,
  setIsEditPopupActive: (isActive: boolean) => void,
  setTaskEditState: (editState: ITaskEditState) => void
): ITaskMethods {
  return {
    onTaskEditClick: onTaskEditClick(setIsEditPopupActive, setTaskEditState),
    onTaskDoneClick: onTaskDoneClick(tasks, setTasksHelper),
    onTaskDeleteClick: onTaskDeleteClick(tasks, setTasksHelper),
    onTaskReturnClick: onTaskReturnClick(tasks, setTasksHelper),
  };
};

export const getWrappedMethods = function (
  taskMethods: ITaskMethods,
  tasksArrName: keyof ITasks,
  task: ITask,
  setTask: (task: ITask) => void
): Record<keyof ITaskMethods, () => void> {
  return {
    onTaskEditClick: () => {
      taskMethods.onTaskEditClick(tasksArrName, task, setTask);
    },
    onTaskDoneClick: () => {
      taskMethods.onTaskDoneClick(tasksArrName, task);
    },
    onTaskDeleteClick: () => {
      taskMethods.onTaskDeleteClick(tasksArrName, task);
    },
    onTaskReturnClick: () => {
      taskMethods.onTaskReturnClick(task);
    },
  };
};

import { TaskService } from '../../API/TaskService';
import { initTaskEditState } from '../../initValues/tasks';
import {
  ITask,
  ITaskEditState,
  ITasks,
  SetTasksHelper,
} from '../../types/tasks';
import { isOutdate } from '../isOutdate';

const onSubmitCreateForm = function (
  tasks: ITasks,
  setTasksHelper: SetTasksHelper,
  setIsCreatePopupActive: (value: boolean) => void
) {
  return (task: ITask) => {
    const taskName = isOutdate(task.date) ? 'outdated' : 'inProgress';
    const newTasks = [task, ...tasks[taskName]];

    setTasksHelper([taskName, newTasks]);
    setIsCreatePopupActive(false);
    TaskService.post(task);
  };
};

const onSubmitEditForm = function (
  tasks: ITasks,
  tasksSortedAndSearched: ITasks,
  setTasksHelper: SetTasksHelper,
  setIsEditPopupActive: (value: boolean) => void,
  setTaskEditState: (editState: ITaskEditState) => void,
  taskEditState: ITaskEditState
) {
  return (taskToInteract: ITask) => {
    setIsEditPopupActive(false);
    taskEditState.set(taskToInteract);
    setTaskEditState(initTaskEditState);
    TaskService.put(taskToInteract);

    if (taskToInteract.status === 'done') return;

    const isNewTaskOutdate = isOutdate(taskToInteract.date);

    const newCurTasks = tasks[taskEditState.taskName].filter(
      (task) => task.id !== taskToInteract.id
    );

    if (
      (isNewTaskOutdate && taskEditState.taskName === 'outdated') ||
      (!isNewTaskOutdate && taskEditState.taskName === 'inProgress')
    ) {
      const test = [taskToInteract, ...newCurTasks];

      setTasksHelper([taskEditState.taskName, test]);

      return;
    }

    const anotherTasksArrName = isNewTaskOutdate ? 'outdated' : 'inProgress';

    const anotherTasksArr = [
      taskToInteract,
      ...tasksSortedAndSearched[anotherTasksArrName],
    ];

    setTasksHelper(
      [taskEditState.taskName, newCurTasks],
      [anotherTasksArrName, anotherTasksArr]
    );
  };
};

export const getFormMethods = function (
  tasks: ITasks,
  tasksSortedAndSearched: ITasks,
  setTasksHelper: SetTasksHelper,
  setIsEditPopupActive: (value: boolean) => void,
  setIsCreatePopupActive: (value: boolean) => void,
  setTaskEditState: (editState: ITaskEditState) => void,
  taskEditState: ITaskEditState
) {
  return {
    onSubmitEditForm: onSubmitEditForm(
      tasks,
      tasksSortedAndSearched,
      setTasksHelper,
      setIsEditPopupActive,
      setTaskEditState,
      taskEditState
    ),
    onSubmitCreateForm: onSubmitCreateForm(
      tasks,
      setTasksHelper,
      setIsCreatePopupActive
    ),
  };
};

import { ProjectService } from '../../API/ProjectService';
import {
  IBtnClasses,
  ICreateState,
  IProjectTaskMethods,
  ProjectWrappedTaskMethods,
} from '../../types/singleProject';
import { IProject, IProjectTask, ProgectTaskStatus } from '../../types/project';

const onTaskDoneOrReturnClick = function (
  data: IProject,
  setData: (data: IProject) => void,
  id: string | number,
  status: ProgectTaskStatus
) {
  return (taskToInteract: IProjectTask) => {
    const newTask: IProjectTask = {
      ...taskToInteract,
      status,
    };
    const newTasks = data.tasks.map((task) => {
      if (newTask.id === task.id) {
        return newTask;
      }
      return task;
    });
    const newData: Partial<IProject> = {
      tasksDone: data.tasksDone + (status === 'active' ? -1 : 1),
      tasks: newTasks,
    };
    ProjectService.patchProject(id, newData);
    setData({
      ...data,
      ...newData,
    });
  };
};

const onTaskDeleteClick = function (
  data: IProject,
  setData: (data: IProject) => void,
  id: string | number
) {
  return (taskToInteract: IProjectTask) => {
    const newTasks = data.tasks.filter((task) => taskToInteract.id !== task.id);
    const newData: Partial<IProject> = {
      tasksTotal: data.tasksTotal - 1,
      tasksDone: data.tasksDone - Number(taskToInteract.status === 'done'),
      tasks: newTasks,
    };
    ProjectService.patchProject(id, newData);

    setData({ ...data, ...newData });
  };
};

const onTaskEditClick = function (
  setDescInputValue: (value: string) => void,
  setBtnClasses: (classes: IBtnClasses) => void,
  setTaskToEdit: (task: IProjectTask) => void,
  setCreateState: (state: ICreateState) => void
) {
  return (taskToInteract: IProjectTask) => {
    setDescInputValue(taskToInteract.desc);
    setBtnClasses({
      add: '--disabled',
      edit: '',
    });
    setTaskToEdit(taskToInteract);
    setCreateState({
      class: '--active',
    });
  };
};

export const getTaskMethods = function (
  data: IProject,
  setData: (data: IProject) => void,
  id: string | number
): IProjectTaskMethods {
  return {
    onTaskReturnClick: onTaskDoneOrReturnClick(data, setData, id, 'active'),
    onTaskDoneClick: onTaskDoneOrReturnClick(data, setData, id, 'done'),
    onTaskDeleteClick: onTaskDeleteClick(data, setData, id),
    onTaskEditClick,
  };
};

export const taskMethodsHandler = function (
  taskMethods: IProjectTaskMethods,
  setDescInputValue: (value: string) => void,
  setBtnClasses: (classes: IBtnClasses) => void,
  setTaskToEdit: (task: IProjectTask) => void,
  setCreateState: (state: ICreateState) => void
) {
  const onTaskEditClickValue = onTaskEditClick(
    setDescInputValue,
    setBtnClasses,
    setTaskToEdit,
    setCreateState
  );
  return (task: IProjectTask): ProjectWrappedTaskMethods => {
    return {
      onTaskDeleteClick: () => {
        taskMethods.onTaskDeleteClick(task);
      },
      onTaskReturnClick: () => {
        taskMethods.onTaskReturnClick(task);
      },
      onTaskDoneClick: () => {
        taskMethods.onTaskDoneClick(task);
      },
      onTaskEditClick: () => {
        onTaskEditClickValue(task);
      },
    };
  };
};

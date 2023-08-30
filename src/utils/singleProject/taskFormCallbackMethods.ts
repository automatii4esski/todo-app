import { ProjectService } from '../../API/ProjectService';
import { IProject, IProjectTask } from '../../types/project';
import { IProjectTaskFormMethods } from '../../types/singleProject';

const onSubmitEditTask = function (
  data: IProject,
  setData: (data: IProject) => void,
  id: string | number
) {
  return (editedTask: IProjectTask) => {
    const newTasks = data.tasks.map((task) => {
      if (editedTask.id === task.id) {
        return editedTask;
      }
      return task;
    });
    const newData = {
      ...data,
      tasks: newTasks,
    };
    setData(newData);
    ProjectService.patchProject(id as string, { tasks: newTasks });
  };
};

const onSubmitCreateTask = function (
  data: IProject,
  setData: (data: IProject) => void,
  id: string | number
) {
  return (task: IProjectTask) => {
    const newTasks = [task, ...data.tasks];
    const newData: Partial<IProject> = {
      tasksTotal: data.tasksTotal + 1,
      tasks: newTasks,
    };
    ProjectService.patchProject(id as string, newData);
    setData({ ...data, ...newData });
  };
};

export const getTaskFormCallbackMethods = function (
  data: IProject,
  setData: (data: IProject) => void,
  id: string | number
): IProjectTaskFormMethods {
  return {
    onSubmitEditTask: onSubmitEditTask(data, setData, id),
    onSubmitCreateTask: onSubmitCreateTask(data, setData, id),
  };
};

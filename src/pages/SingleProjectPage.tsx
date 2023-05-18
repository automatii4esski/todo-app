import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import DateElement from '../components/UI/date/DateElement';
import { getDate } from '../utils/getDate';
import MyButton from '../components/UI/button/MyButton';

import ProgressLine from '../components/UI/progressLine/ProgressLine';
import SingleProjectTask from '../components/SingleProject/SingleProjectTask';
import { useParams } from 'react-router-dom';
import { IProject, IProjectTask, ProgectTaskStatus } from '../types/common';
import { useFetch } from '../hooks/useFetch';
import { ProjectService } from '../API/ProjectService';
import Loader from '../components/UI/loader/Loader';
import MyTextarea from '../components/UI/textarea/MyTextarea';
import SingleProjectDescription from '../components/SingleProject/SingleProjectDescription';
import SingleProjectMicrotasks from '../components/SingleProject/SingleProjectMicrotasks';

const plugData: IProject = {
  id: 0,
  deadline: Date.now(),
  desc: '',
  title: '',
  tasks: [],
  additionalDescs: [],
  tasksTotal: 0,
  tasksDone: 0,
};

const SingleProjectPage = () => {
  const [data, setData] = useState<IProject>(plugData);
  const { id } = useParams();

  const [fetchProject, isLoading, error] = useFetch(async () => {
    const response = await ProjectService.getById(id as string);
    setData(response.data[0]);
  });

  useEffect(() => {
    fetchProject();
  }, []);

  if (isLoading) {
    return (
      <div className="singleproject__loader-wrapper">
        <Loader></Loader>
      </div>
    );
  }

  const onEditTaskSubmit = function (editedTask: IProjectTask) {
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
    ProjectService.patchTask(id as string, { tasks: newTasks });
  };

  const onCreateTask = function (task: IProjectTask) {
    const newTasks = [task, ...data.tasks];
    const newData: Partial<IProject> = {
      tasksTotal: data.tasksTotal + 1,
      tasks: newTasks,
    };
    ProjectService.patchTask(id as string, newData);
    setData({ ...data, ...newData });
  };

  const onTaskDoneOrReturnClick = function (
    taskToInteract: IProjectTask,
    status: ProgectTaskStatus
  ) {
    return () => {
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
      ProjectService.patchTask(id as string, newData);
      setData({
        ...data,
        ...newData,
      });
    };
  };

  const onTaskDeleteClick = function (taskToInteract: IProjectTask) {
    return () => {
      const newTasks = data.tasks.filter(
        (task) => taskToInteract.id !== task.id
      );
      const newData: Partial<IProject> = {
        tasksTotal: data.tasksTotal - 1,
        tasksDone: data.tasksDone - Number(taskToInteract.status === 'done'),
        tasks: newTasks,
      };
      ProjectService.patchTask(id as string, newData);

      setData({ ...data, ...newData });
    };
  };

  const onSubmitAdditionalDesc = function (newDesc: string) {
    const newData = {
      ...data,
      additionalDescs: [
        ...data.additionalDescs,
        {
          date: Date.now(),
          text: newDesc,
        },
      ],
    };
    setData(newData);
    ProjectService.putById(newData);
  };

  return (
    <div className="singleproject">
      <div className="singleproject__content">
        <div className="singleproject__info">
          <h2 className="singleproject__title">{data.title}</h2>
          <SingleProjectDescription
            desc={data.desc}
            additionalDescs={data.additionalDescs}
            onSubmitAdditionalDesc={onSubmitAdditionalDesc}
          />
          <div className="singleproject__info-bottom">
            <div className="singleproject__date">
              <div className="singleproject__date-text">Deadline:</div>
              <DateElement>{getDate(Date.now())}</DateElement>
            </div>
            <div className="singleproject__actions">
              <MyButton className="singleproject__actions-btn singleproject__actions-complete">
                Complete
              </MyButton>
              <MyButton className="singleproject__actions-btn singleproject__actions-delete">
                Delete
              </MyButton>
            </div>
          </div>
        </div>
        <SingleProjectMicrotasks
          onCreateTask={onCreateTask}
          onTaskDeleteClick={onTaskDeleteClick}
          onEditTaskSubmit={onEditTaskSubmit}
          onTaskDoneOrReturnClick={onTaskDoneOrReturnClick}
          data={data}
        />
      </div>
    </div>
  );
};

export default SingleProjectPage;

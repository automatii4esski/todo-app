import React, { useState, ChangeEvent } from 'react';
import { MyFC } from '../../types/common';
import MyInput from '../UI/Input/MyInput';
import MyTextarea from '../UI/textarea/MyTextarea';
import MyButton from '../UI/button/MyButton';
import RoundButton from '../UI/button/RoundButton';
import CreateProjectTaskForm from './CreateProjectTaskForm';
import { useInput } from '../../hooks/useInput';
import { ProjectService } from '../../API/ProjectService';
import { IProject } from '../../types/projects';

const initData: IProject = {
  id: 0,
  deadline: Date.now(),
  desc: '',
  title: '',
  tasks: [],
  additionalDescs: [],
  tasksTotal: 0,
  tasksDone: 0,
};

interface ICreateProjectForm {
  addProject: (project: IProject) => void;
}

const CreateProjectForm: MyFC<ICreateProjectForm> = ({ addProject }) => {
  const [data, setData] = useState<IProject>(initData);
  const [taskValue, setTaskValue] = useState<string>('');
  const onAddTaskClick = function () {
    if (!taskValue) return;
    setData({
      ...data,
      tasksTotal: ++data.tasksTotal,
      tasks: [
        {
          id: Date.now(),
          desc: taskValue,
          status: 'active',
        },
        ...data.tasks,
      ],
    });
    setTaskValue('');
  };

  const onDeleteTask = function (id: number) {
    return () => {
      setData({
        ...data,
        tasksTotal: --data.tasksTotal,
        tasks: data.tasks.filter((task) => task.id !== id),
      });
    };
  };

  const onFormSubmit = function (e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const finalData = {
      ...data,
      id: Date.now(),
    };
    ProjectService.post(finalData);
    addProject(finalData);
    setData(initData);
  };

  return (
    <div className="create create-project">
      <h4 className="create__title">Create Project</h4>
      <form
        onSubmit={onFormSubmit}
        className="create__form create-project__from"
      >
        <div className="create-project__data">
          <MyInput
            required
            value={data.title}
            onChange={(e) => {
              setData({
                ...data,
                title: e.target.value,
              });
            }}
            className="create__item"
            type="text"
            placeholder="Title"
          />
          <MyTextarea
            className="create__item create__textarea"
            value={data.desc}
            onChange={(e) => {
              setData({
                ...data,
                desc: e.target.value,
              });
            }}
            placeholder="Description"
          />
          <label className="create__item create__label">
            <h6 className="create__label-title">Date:</h6>
            <MyInput
              min="1970-04-01"
              max="2030-04-30"
              required
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (e.target.value) {
                  setData({
                    ...data,
                    deadline: new Date(e.target.value).getTime(),
                  });
                }
              }}
              value={new Date(data.deadline).toISOString().substring(0, 10)}
              type="date"
            />
          </label>
        </div>
        <div className="create-project__tasks">
          <div className="create-project__tasks-box">
            <MyInput
              value={taskValue}
              type="text"
              onChange={(e) => {
                setTaskValue(e.target.value);
              }}
              placeholder="Task"
            />
            <div onClick={onAddTaskClick} className="create-project__tasks-add">
              <span className="create-project__tasks-span"> +</span>
            </div>
          </div>
          <div className="create-project__tasks-content">
            {data.tasks.length === 0 ? (
              <div className="create-project__tasks-plug">
                <span>No Tasks</span>
              </div>
            ) : (
              data.tasks.map((task) => (
                <CreateProjectTaskForm
                  onDelete={onDeleteTask(task.id)}
                  key={task.id}
                >
                  {task.desc}
                </CreateProjectTaskForm>
              ))
            )}
          </div>
        </div>
        <MyButton className="create-project__submit" type="submit">
          Add Project
        </MyButton>
      </form>
    </div>
  );
};

export default CreateProjectForm;

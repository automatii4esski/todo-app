import { useState } from 'react';
import { MyFC } from '../../types/common';
import MyInput from '../UI/Input/MyInput';
import MyTextarea from '../UI/textarea/MyTextarea';
import MyButtonType from '../UI/button/MyButton';
import CreateProjectTaskForm from './CreateProjectTaskForm';
import { ICreateProjectForm, IProject } from '../../types/project';
import { initProjectValue } from '../../initValues/singleProject';
import { getCreateProjectFormMethods } from '../../utils/projects/createFormMethods';
import MyButton from '../UI/button/MyButton';
import ColorsRadio from '../UI/Input/ColorsRadio';
import MySelect from '../UI/select/MySelect';
import { projectPriority } from '../../values/projects';

const CreateProjectForm: MyFC<ICreateProjectForm> = ({ onCreateProject }) => {
  const [data, setData] = useState<IProject>(initProjectValue);
  const [taskValue, setTaskValue] = useState<string>('');

  const dateValue = new Date(data.deadline).toISOString().substring(0, 10);
  const createProjectFormMethods = getCreateProjectFormMethods(
    data,
    setData,
    taskValue,
    setTaskValue,
    onCreateProject
  );

  return (
    <div className="create create-project">
      <h4 className="create__title">Create Project</h4>
      <form
        onSubmit={createProjectFormMethods.onFormSubmit}
        className="create__form create-project__from"
      >
        <div className="create-project__data">
          <MyInput
            required
            value={data.title}
            onChange={createProjectFormMethods.onTitleChange}
            className="create__item"
            type="text"
            placeholder="Title"
          />
          <MyTextarea
            className="create__item create__textarea"
            value={data.desc}
            onChange={createProjectFormMethods.onDescChange}
            placeholder="Description"
          />
          <label
            onChange={createProjectFormMethods.onInsideColorLabelChange}
            className="create__item create__label"
          >
            <h6 className="create__label-title">Color:</h6>
            <ColorsRadio defaultValue={data.color} />
          </label>
          <div className="create__input-box">
            <label className="create__item create__label">
              <h6 className="create__label-title">Deadline:</h6>
              <MyInput
                min="1970-04-01"
                max="2030-04-30"
                required
                onChange={createProjectFormMethods.onDateChange}
                value={dateValue}
                type="date"
              />
            </label>
            <label className="create__item create__label">
              <h6 className="create__label-title">Priority:</h6>
              <MySelect
                onChange={createProjectFormMethods.onSelectPriorityChange}
                value={data.priority}
                defaultText="select priority"
                options={projectPriority}
              ></MySelect>
            </label>
          </div>
        </div>
        <div className="create-project__tasks">
          <div className="create-project__tasks-box">
            <MyInput
              value={taskValue}
              type="text"
              onChange={createProjectFormMethods.onChangeTaskDesc}
              placeholder="Task"
            />
            <div
              onClick={createProjectFormMethods.onAddTaskClick}
              className="create-project__tasks-add"
            >
              <span className="create-project__tasks-span"> +</span>
            </div>
          </div>
          <div className="create-project__tasks-content">
            {data.tasks.length === 0 ? (
              <div className="create-project__tasks-plug">
                <span>No Tasks</span>
                <p className="create-project__warning">
                  You can add tasks later
                </p>
              </div>
            ) : (
              data.tasks.map((task) => (
                <CreateProjectTaskForm
                  onDelete={createProjectFormMethods.onDeleteTask}
                  id={task.id}
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

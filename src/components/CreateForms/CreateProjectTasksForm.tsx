import { useState } from 'react';
import RoundButton from '../UI/button/RoundButton';
import { ReactComponent as DeleteIcon } from '../../images/icons/cross.svg';
import { MyFC } from '../../types/common';
import { ICreateProjectTasksForm } from '../../types/singleProject';
import MyInput from '../UI/Input/MyInput';
import { IProjectTask } from '../../types/project';

const CreateProjectTasksForm: MyFC<ICreateProjectTasksForm> = ({
  taskInputValue,
  data,
  formMethods,
}) => {
  return (
    <div className="create-project__tasks">
      <div className="create-project__tasks-box">
        <MyInput
          value={taskInputValue}
          type="text"
          onChange={formMethods.onChangeTaskDesc}
          placeholder="Task"
        />
        <div
          onClick={formMethods.onAddTaskClick}
          className="create-project__tasks-add"
        >
          <span className="create-project__tasks-span"> +</span>
        </div>
      </div>
      <div className="create-project__tasks-content">
        {data.tasks.length === 0 ? (
          <div className="create-project__tasks-plug">
            <span>No Tasks</span>
            <p className="create-project__warning">You can add tasks later</p>
          </div>
        ) : (
          data.tasks.map((task) => (
            <div key={task.id} className="create-project__tasks-item">
              <p className="create-project__tasks-desc">{task.desc}</p>
              <RoundButton
                type="button"
                onClick={formMethods.onDeleteTask(task.id)}
                className="create-project__tasks-delete"
              >
                <DeleteIcon />
              </RoundButton>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CreateProjectTasksForm;

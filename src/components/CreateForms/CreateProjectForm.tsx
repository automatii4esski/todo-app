import { useState, useEffect } from 'react';
import { MyFC } from '../../types/common';
import MyInput from '../UI/Input/MyInput';
import MyTextarea from '../UI/textarea/MyTextarea';
import MyButtonType from '../UI/button/MyButton';
import CreateProjectTasksForm from './CreateProjectTasksForm';
import { ICreateProjectForm, IProject } from '../../types/project';
import { initProjectValue } from '../../initValues/singleProject';
import { getCreateProjectFormMethods } from '../../utils/projects/createFormMethods';
import MyButton from '../UI/button/MyButton';
import ColorsRadio from '../UI/Input/ColorsRadio';
import MySelect from '../UI/select/MySelect';
import { projectPriority } from '../../values/projects';
import CreateProjectMainDataForm from './CreateProjectMainDataForm';

const CreateProjectForm: MyFC<ICreateProjectForm> = ({ onCreateProject }) => {
  const [data, setData] = useState<IProject>(initProjectValue);
  const [taskValue, setTaskValue] = useState<string>('');

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
        <CreateProjectMainDataForm
          data={data}
          formMethods={createProjectFormMethods}
        />
        <CreateProjectTasksForm
          data={data}
          formMethods={createProjectFormMethods}
          taskInputValue={taskValue}
        />
        <MyButton className="create-project__submit" type="submit">
          Add Project
        </MyButton>
      </form>
    </div>
  );
};

export default CreateProjectForm;

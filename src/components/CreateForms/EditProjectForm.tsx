import { useState, useEffect, FormEvent } from 'react';
import { MyFC } from '../../types/common';
import MyInput from '../UI/Input/MyInput';
import MyTextarea from '../UI/textarea/MyTextarea';
import MyButtonType from '../UI/button/MyButton';
import CreateProjectTasksForm from './CreateProjectTasksForm';
import { ICreateProjectForm, IProject } from '../../types/project';
import { initProjectValue } from '../../initValues/singleProject';
import {
  getCreateProjectFormMethods,
  getEditProjectFormMethods,
} from '../../utils/projects/createFormMethods';
import MyButton from '../UI/button/MyButton';
import ColorsRadio from '../UI/Input/ColorsRadio';
import MySelect from '../UI/select/MySelect';
import { projectPriority } from '../../values/projects';
import CreateProjectMainDataForm from './CreateProjectMainDataForm';
import { IEditProjectForm } from '../../types/singleProject';
import { ProjectService } from '../../API/ProjectService';

const EditProjectForm: MyFC<IEditProjectForm> = ({
  initProject,
  onEditSubmit,
}) => {
  const [data, setData] = useState<IProject>(initProject);

  const editProjectFormMethods = getEditProjectFormMethods(data, setData);

  const onFormSubmit = function (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onEditSubmit(data);
  };

  return (
    <div className="create create-project">
      <h4 className="create__title">Edit Project</h4>
      <form
        onSubmit={onFormSubmit}
        className="create__form create-project__from"
      >
        <CreateProjectMainDataForm
          data={data}
          formMethods={editProjectFormMethods}
          className="create__form-edit"
        />
        <MyButton className="create-project__submit" type="submit">
          Edit Project
        </MyButton>
      </form>
    </div>
  );
};

export default EditProjectForm;

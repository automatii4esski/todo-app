import { FC } from 'react';
import MyInput from '../UI/Input/MyInput';
import MyTextarea from '../UI/textarea/MyTextarea';
import ColorsRadio from '../UI/Input/ColorsRadio';
import MySelect from '../UI/select/MySelect';
import { MyFC } from '../../types/common';
import { projectPriority } from '../../values/projects';
import { ICreateProjectMainDataForm } from '../../types/project';

const CreateProjectMainDataForm: MyFC<ICreateProjectMainDataForm> = ({
  data,
  formMethods,
  className,
}) => {
  const dateValue = new Date(data.deadline).toISOString().substring(0, 10);

  return (
    <>
      <div className={`create-project__data ${className}`}>
        <MyInput
          required
          value={data.title}
          onChange={formMethods.onTitleChange}
          className="create__item"
          type="text"
          placeholder="Title"
        />
        <MyTextarea
          className="create__item create__textarea"
          value={data.desc}
          onChange={formMethods.onDescChange}
          placeholder="Description"
        />
        <label
          onChange={formMethods.onInsideColorLabelChange}
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
              onChange={formMethods.onDateChange}
              value={dateValue}
              type="date"
            />
          </label>
          <label className="create__item create__label">
            <h6 className="create__label-title">Priority:</h6>
            <MySelect
              onChange={formMethods.onSelectPriorityChange}
              value={data.priority}
              defaultText="select priority"
              options={projectPriority}
            ></MySelect>
          </label>
        </div>
      </div>
    </>
  );
};

export default CreateProjectMainDataForm;

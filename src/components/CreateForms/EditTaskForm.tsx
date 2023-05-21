import React, { useState, useEffect, ChangeEvent } from 'react';
import MyInput from '../UI/Input/MyInput';
import MyTextarea from '../UI/textarea/MyTextarea';
import MyButton from '../UI/button/MyButton';
import { MyFC } from '../../types/common';
import { ITask } from '../../types/tasks';
import { initTaskValue } from '../../initValues/tasks';
import { getMethods } from '../../utils/tasks/createFormMethods';

interface ICreateTaskForm {
  onSubmit: (task: ITask) => void;
  task: ITask | undefined;
}
const EditTaskForm: MyFC<ICreateTaskForm> = ({ task, onSubmit }) => {
  const [data, setData] = useState<ITask>(initTaskValue);

  useEffect(() => {
    setData(task || initTaskValue);
  }, [task]);

  const onFormSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit(data);
    setData(initTaskValue);
  };

  const formMethods = getMethods(data, setData);

  const dateValue = new Date(data.date).toISOString().substring(0, 10);

  return (
    <div className="create">
      <h4 className="create__title">Edit Task</h4>
      <form onSubmit={onFormSubmit} className="create__form">
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
        <label className="create__item create__label">
          <h6 className="create__label-title">Date:</h6>
          <MyInput
            min="1970-04-01"
            max="2030-04-30"
            required
            onChange={formMethods.onDateChange}
            value={dateValue}
            type="date"
          />
        </label>
        <MyButton>Edit Task</MyButton>
      </form>
    </div>
  );
};

export default EditTaskForm;

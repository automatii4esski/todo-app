import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import MyInput from './UI/Input/MyInput';
import MyTextarea from './UI/textarea/MyTextarea';
import MyButton from './UI/button/MyButton';
import { ITask, MyFC } from '../types/types';
import { getDate } from '../utils/getDate';
import { useInput } from '../hooks/useInput';

interface ICreateTaskForm {
  onSubmit: (task: ITask) => void;
  task: ITask | undefined;
}

const initData: ITask = {
  id: 0,
  date: Date.now(),
  desc: '',
  status: 'active',
  title: '',
};

const EditTaskForm: MyFC<ICreateTaskForm> = ({ task, onSubmit }) => {
  const [data, setData] = useState<ITask>(initData);

  useEffect(() => {
    setData(task || initData);
  }, [task]);

  return (
    <div className="create">
      <h4 className="create__title">Edit Task</h4>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          onSubmit(data);
          setData(initData);
        }}
        className="create__form"
      >
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
                  date: new Date(e.target.value).getTime(),
                });
              }
            }}
            value={new Date(data.date).toISOString().substring(0, 10)}
            type="date"
          />
        </label>
        <MyButton>Edit Task</MyButton>
      </form>
    </div>
  );
};

export default EditTaskForm;

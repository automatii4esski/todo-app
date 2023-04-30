import React, { HTMLAttributes } from 'react';
import Task from './Task';
import { MyFC } from '../types/types';
import { getConcatClassName } from '../utils/getClassName';
import { JsxAttribute } from 'typescript';

interface ITaskColumn {
  title: string;
}

type TaskColumnProps = ITaskColumn & HTMLAttributes<HTMLElement>;

const TaskColumn: MyFC<TaskColumnProps> = ({ className, title }) => {
  return (
    <div className="task-column">
      <div className="task-column__header">
        <h3 className="task-column__title">{title}</h3>
      </div>
      <div className="task-column__content">
        <Task></Task>
        <Task></Task>
        <Task></Task>
        <Task></Task>
      </div>
    </div>
  );
};

export default TaskColumn;

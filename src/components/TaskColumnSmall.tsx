import React, { HTMLAttributes } from 'react';
import Task from './Task';
import { MyFC } from '../types/types';

const TaskColumnSmall: MyFC<HTMLAttributes<HTMLElement>> = () => {
  return (
    <div className="task-column task-column--small">
      <div className="task-column__content">
        <Task></Task>
        <Task></Task>
        <Task></Task>
        <Task></Task>
        <Task></Task>
        <Task></Task>
        <Task></Task>
      </div>
    </div>
  );
};

export default TaskColumnSmall;

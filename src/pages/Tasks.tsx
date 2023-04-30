import React from 'react';
import { MyFC } from '../types/types';
import TaskColumn from '../components/TaskColumn';
import { getConcatClassName } from '../utils/getClassName';
import TaskColumnSmall from '../components/TaskColumnSmall';

const Tasks: MyFC = () => {
  return (
    <div className="task">
      <TaskColumnSmall />
      <TaskColumn title="In Progress" />
      <TaskColumnSmall />
    </div>
  );
};

export default Tasks;

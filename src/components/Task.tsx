import React from 'react';
import { MyFC } from '../types/types';
import DateElement from './UI/date/DateElement';
import { ReactComponent as DoneIcon } from '../images/icons/done.svg';
import { cutString } from '../utils/cutString';

const Task: MyFC = () => {
  const desc = cutString(
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi quostemporibus odit, expedita corporis iure labore quae, dolore quaerat nostrum saepe maxime quisquam? Provident aperiam totam quidem voluptate recusandae atque?',
    100
  ).firstPart;

  return (
    <div className="task-item">
      <div className="task-item__header">
        <h4 className="task-item__title">Design new ui presentation</h4>
        <button className="task-item__service"></button>
      </div>
      <p className="task-item__desc">{desc}</p>
      <div className="task-item__box">
        <DateElement>12 02 2002</DateElement>
        <button className="task-item__done-btn">
          <DoneIcon />
        </button>
      </div>
    </div>
  );
};

export default Task;

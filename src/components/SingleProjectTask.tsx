import React from 'react';
import { ReactComponent as DoneIcon } from '../images/icons/done.svg';
import { ReactComponent as DeleteIcon } from '../images/icons/cross.svg';
import { ReactComponent as ArrowLeftIcon } from '../images/icons/arrow-left.svg';
import { ReactComponent as EditIcon } from '../images/icons/edit.svg';
import { MyFC } from '../types/types';

const SingleProjectTask: MyFC = () => {
  return (
    <div className="singleproject-microtasks__item">
      <div className="singleproject-microtasks__item-content">
        <p className="singleproject-microtasks__item-desc">
          Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit
        </p>
        <div className="singleproject-microtasks__item-bottom">
          <button className="singleproject-microtasks__item-edit">
            Edit
            <EditIcon className="singleproject-microtasks__edit-icon" />
          </button>
        </div>
      </div>

      <div className="singleproject-microtasks__item-actions">
        <button className="singleproject-microtasks__item-btn singleproject-microtasks__item-done">
          <DoneIcon className="singleproject-microtasks__item-icon" />
        </button>
        <button className="singleproject-microtasks__item-btn singleproject-microtasks__item-delete">
          <DeleteIcon className="singleproject-microtasks__item-icon" />
        </button>
      </div>
    </div>
  );
};

export default SingleProjectTask;

import React, { useState } from 'react';
import { MyFC, ProgectTaskStatus } from '../types/types';
import ProgressLine from './UI/progressLine/ProgressLine';
import { IProjectTask } from '../types/types';
import { useTasks } from '../hooks/useProjectTasks';
import SingleProjectTask from './SingleProjectTask';

interface ISingleProjectMicrotasks {
  microtasks: IProjectTask[];
}

const SingleProjectMicrotasks: MyFC<ISingleProjectMicrotasks> = ({
  microtasks,
}) => {
  const [filter, setFilter] = useState<ProgectTaskStatus | ''>('');
  const [filterClasses, setFilterClasses] = useState({
    done: '',
    active: '',
    all: '--active',
  });

  const setFilterHelper = function (name: keyof typeof filterClasses) {
    return () => {
      for (const key in filterClasses) {
        filterClasses[key as keyof typeof filterClasses] = '';
      }
      setFilterClasses({
        ...filterClasses,
        [name]: '--active',
      });
      setFilter(name === 'all' ? '' : name);
    };
  };

  const filteredTasks = useTasks(microtasks, filter);

  return (
    <div className="singleproject-microtasks">
      <h3 className="singleproject__sub-title singleproject-microtasks__title">
        Microtasks
      </h3>
      <div className="singleproject-microtasks__filter">
        <div
          onClick={setFilterHelper('done')}
          className={`singleproject-microtasks__filter-item${filterClasses.done}`}
        >
          Done
        </div>
        <div
          onClick={setFilterHelper('active')}
          className={`singleproject-microtasks__filter-item${filterClasses.active}`}
        >
          In progress
        </div>
        <div
          onClick={setFilterHelper('all')}
          className={`singleproject-microtasks__filter-item${filterClasses.all}`}
        >
          All
        </div>
      </div>
      <div className="singleproject-microtasks__content-wrapper">
        <div className="singleproject-microtasks__content">
          {filteredTasks.length !== 0 ? (
            filteredTasks.map((task) => (
              <SingleProjectTask key={task.id} task={task} />
            ))
          ) : (
            <div className="singleproject-microtasks-plug">
              <span>No Tasks</span>
            </div>
          )}
        </div>
        <div className="singleproject-microtasks__bottom">
          <ProgressLine
            className="singleproject-microtasks__progress"
            width={0}
            count="1/10"
          />
          <button className="singleproject-microtasks__add">
            <span className="singleproject-microtasks__add-span">+</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProjectMicrotasks;

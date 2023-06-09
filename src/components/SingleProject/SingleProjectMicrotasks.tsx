import React, { useState, useRef, MouseEvent, ChangeEvent } from 'react';
import { MyFC } from '../../types/common';
import ProgressLine from '../UI/progressLine/ProgressLine';
import { useTasks } from '../../hooks/singleProject/useProjectTasks';
import SingleProjectTask from './SingleProjectTask';
import MyTextarea from '../UI/textarea/MyTextarea';
import { ProjectService } from '../../API/ProjectService';
import {
  IProject,
  IProjectTask,
  IProjectTaskFormMethods,
  IProjectTaskMethods,
  ProgectTaskStatus,
} from '../../types/projects';
import {
  initBtnClassesValue,
  initFilterClassesValue,
  initProjectTaskValue,
} from '../../initValues/singleProject';
import { taskMethodsHandler } from '../../utils/singleProject/taskMethods';

interface ISingleProjectMicrotasks {
  data: IProject;
  taskMethods: IProjectTaskMethods;
  taskFormMethods: IProjectTaskFormMethods;
}

const SingleProjectMicrotasks: MyFC<ISingleProjectMicrotasks> = ({
  data,
  taskMethods,
  taskFormMethods,
}) => {
  const [filter, setFilter] = useState<ProgectTaskStatus | ''>('');
  const [filterClasses, setFilterClasses] = useState(initFilterClassesValue);
  const [btnClasses, setBtnClasses] = useState(initBtnClassesValue);
  const [taskToEdit, setTaskToEdit] =
    useState<IProjectTask>(initProjectTaskValue);

  const [descInputValue, setDescInputValue] = useState<string>('');

  const onDescInputChange = function (e: ChangeEvent<HTMLTextAreaElement>) {
    setDescInputValue(e.target.value);
  };

  const onCreateSubmit = function (e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    setCreateState({
      ...createState,
      class: '',
    });
    if (!descInputValue) return;
    const newTask: IProjectTask = {
      desc: descInputValue,
      status: 'active',
      id: Date.now(),
    };
    taskFormMethods.onSubmitCreateTask(newTask);
    setDescInputValue('');
  };

  const onEditSubmit = function (e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setCreateState({
      ...createState,
      class: '',
    });
    if (!descInputValue) return;

    const newTask = {
      ...taskToEdit,
      desc: descInputValue,
    };
    setDescInputValue('');

    taskFormMethods.onSubmitEditTask(newTask);
  };

  const [createState, setCreateState] = useState({
    class: '',
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

  const getWrappedTaskMethods = taskMethodsHandler(
    taskMethods,
    setDescInputValue,
    setBtnClasses,
    setTaskToEdit,
    setCreateState
  );

  const filteredTasks = useTasks(data.tasks, filter);

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
          <div
            onClick={() => {
              setCreateState({
                ...createState,
                class: '',
              });
            }}
            className={`singleproject-microtasks__create${createState.class}`}
          >
            <form
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="singleproject-microtasks__create-form"
            >
              <MyTextarea
                value={descInputValue}
                onChange={onDescInputChange}
                className="singleproject-microtasks__create-input"
                placeholder="Description"
              />
              <div className="singleproject-microtasks__create-btn">
                <button
                  className={`singleproject__btn${btnClasses.edit} singleproject-microtasks__create-edit`}
                  type="submit"
                  onClick={onEditSubmit}
                >
                  Edit
                </button>
                <button
                  className={`singleproject__btn${btnClasses.add} singleproject-microtasks__create-submit`}
                  type="submit"
                  onClick={onCreateSubmit}
                >
                  Add
                </button>
                <button
                  onClick={() => {
                    setDescInputValue('');

                    setCreateState({
                      ...createState,
                      class: '',
                    });
                  }}
                  className="singleproject__btn 
                singleproject-microtasks__create-close"
                  type="button"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
          {filteredTasks.length !== 0 ? (
            filteredTasks.map((task) => (
              <SingleProjectTask
                getWrappedTaskMethods={getWrappedTaskMethods}
                key={task.id}
                task={task}
              />
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
            width={(data.tasksDone / data.tasksTotal) * 100}
            count={`${data.tasksDone}/${data.tasksTotal}`}
          />
          <button className="singleproject-microtasks__add">
            <span
              onClick={() => {
                setBtnClasses({
                  add: '',
                  edit: '--disabled',
                });
                setCreateState({
                  ...createState,
                  class: '--active',
                });
              }}
              className="singleproject-microtasks__add-span"
            >
              +
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProjectMicrotasks;

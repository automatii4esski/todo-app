import React, { useState, useRef, MouseEvent } from 'react';
import { IProject, ITask, MyFC, ProgectTaskStatus } from '../../types/types';
import ProgressLine from '../UI/progressLine/ProgressLine';
import { IProjectTask } from '../../types/types';
import { useTasks } from '../../hooks/useProjectTasks';
import SingleProjectTask from './SingleProjectTask';
import MyTextarea from '../UI/textarea/MyTextarea';
import { ProjectService } from '../../API/ProjectService';

interface ISingleProjectMicrotasks {
  data: IProject;
  onCreateTask: (task: IProjectTask) => void;
  onTaskDeleteClick: (task: IProjectTask) => () => void;
  onEditTaskSubmit: (task: IProjectTask) => void;
  onTaskDoneOrReturnClick: (
    task: IProjectTask,
    status: ProgectTaskStatus
  ) => () => void;
}

const SingleProjectMicrotasks: MyFC<ISingleProjectMicrotasks> = ({
  data,
  onCreateTask,
  onEditTaskSubmit,
  onTaskDoneOrReturnClick,
  onTaskDeleteClick,
}) => {
  const [filter, setFilter] = useState<ProgectTaskStatus | ''>('');
  const [filterClasses, setFilterClasses] = useState({
    done: '',
    active: '',
    all: '--active',
  });
  const [btnClasses, setBtnClasses] = useState({
    add: '',
    edit: '--disabled',
  });
  const [taskToEdit, setTaskToEdit] = useState<IProjectTask>({
    id: 0,
    desc: '',
    status: 'active',
  });

  const onCreateSubmit = function (e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    setCreateState({
      ...createState,
      class: '',
    });
    if (!createInputRef.current!.value) return;
    const newTask: IProjectTask = {
      desc: createInputRef.current!.value,
      status: 'active',
      id: Date.now(),
    };
    onCreateTask(newTask);
    createInputRef.current!.value = '';
  };

  const onEditSubmit = function (e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setCreateState({
      ...createState,
      class: '',
    });
    if (!createInputRef.current!.value) return;

    const newTask = {
      ...taskToEdit,
      desc: createInputRef.current!.value,
    };
    createInputRef.current!.value = '';
    onEditTaskSubmit(newTask);
  };

  const [createState, setCreateState] = useState({
    class: '',
  });
  const createInputRef = useRef<HTMLTextAreaElement>(null);

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

  const onEditClick = function (taskToInteract: IProjectTask) {
    return () => {
      createInputRef.current!.value = taskToInteract.desc;
      setBtnClasses({
        add: '--disabled',
        edit: '',
      });
      setTaskToEdit(taskToInteract);
      setCreateState({
        class: '--active',
      });
    };
  };

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
                reference={createInputRef}
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
                    createInputRef.current!.value = '';

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
                onTaskDoneClick={onTaskDoneOrReturnClick(task, 'done')}
                onTaskDeleteClick={onTaskDeleteClick(task)}
                onTaskReturnClick={onTaskDoneOrReturnClick(task, 'active')}
                onEditClick={onEditClick(task)}
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

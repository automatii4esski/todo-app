import { useState } from 'react';
import { MyFC } from '../../types/common';
import { useTasks } from '../../hooks/singleProject/useProjectTasks';
import SingleProjectTask from './SingleProjectTask';
import {
  ICreateState,
  ISingleProjectMicrotasks,
} from '../../types/singleProject';
import { IProjectTask } from '../../types/project';
import {
  initBtnClassesValue,
  initProjectTaskValue,
} from '../../initValues/singleProject';
import { taskMethodsHandler } from '../../utils/singleProject/taskMethods';
import { getTaskFormMethods } from '../../utils/singleProject/taskFormMethods';
import { useFilter } from '../../hooks/singleProject/useFilter';
import SingleProjectMicrotasksTop from './SingleProjectMicrotasksTop';
import SingleProjectMicrotasksCreateForm from '../CreateForms/SingleProjectMicrotasksCreateForm';
import SingleProjectMicrotasksBot from './SingleProjectMicrotasksBot';

const SingleProjectMicrotasks: MyFC<ISingleProjectMicrotasks> = ({
  data,
  taskMethods,
  taskFormCallbackMethods,
}) => {
  const [btnClasses, setBtnClasses] = useState(initBtnClassesValue);
  const [taskToEdit, setTaskToEdit] =
    useState<IProjectTask>(initProjectTaskValue);

  const [descInputValue, setDescInputValue] = useState<string>('');

  const [filter, filterClasses, filterMethods] = useFilter();

  const [createState, setCreateState] = useState<ICreateState>({
    class: '',
  });

  const taskFormMethods = getTaskFormMethods(
    taskFormCallbackMethods,
    setCreateState,
    setDescInputValue,
    descInputValue,
    taskToEdit
  );

  const getWrappedTaskMethods = taskMethodsHandler(
    taskMethods,
    setDescInputValue,
    setBtnClasses,
    setTaskToEdit,
    setCreateState
  );

  const onCreateTaskClick = function () {
    setBtnClasses({
      add: '',
      edit: '--disabled',
    });
    setCreateState({
      ...createState,
      class: '--active',
    });
  };

  const filteredTasks = useTasks(data.tasks, filter);

  return (
    <div className="singleproject-microtasks">
      <SingleProjectMicrotasksTop
        filterMethods={filterMethods}
        filterClasses={filterClasses}
      />
      <div
        className={`singleproject-microtasks__content-wrapper singleproject-microtasks__content-wrapper--${data.color}`}
      >
        <div className="singleproject-microtasks__content">
          <SingleProjectMicrotasksCreateForm
            formMethods={taskFormMethods}
            btnClasses={btnClasses}
            descInputValue={descInputValue}
            createState={createState}
          />
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
        <SingleProjectMicrotasksBot
          onCreateTaskClick={onCreateTaskClick}
          data={data}
        />
      </div>
    </div>
  );
};

export default SingleProjectMicrotasks;

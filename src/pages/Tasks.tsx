import React, { useEffect, useMemo, useState } from 'react';
import { ITask, MyFC } from '../types/types';
import TaskColumn from '../components/TaskColumn';
import { getConcatClassName } from '../utils/getClassName';
import { TaskService } from '../API/TaskService';
import { useFetch } from '../hooks/useFetch';
import { useTasks } from '../hooks/useTasks';
import PopupTemplate from '../components/UI/popup/PopupTemplate';
import CreateTaskForm from '../components/CreateTaskForm';
import { isOutdate } from '../utils/isOutdate';

const Tasks: MyFC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [doneTasks, setDoneTasks] = useState<ITask[]>([]);
  const [outdatedTasks, setOIutdatedTasks] = useState<ITask[]>([]);
  const [inProgressTasks, setInProgressTasks] = useState<ITask[]>([]);

  const [fetchTasks, isTasksLoading, tasksError] = useFetch(async () => {
    const response = await TaskService.getAll();
    setTasks(response.data);
    const done: ITask[] = [];
    const outdated: ITask[] = [];
    const inProgress: ITask[] = [];

    response.data.forEach((task) => {
      if (task.status === 'done') {
        done.push(task);
      } else {
        isOutdate(task.date) ? outdated.push(task) : inProgress.push(task);
      }
    });
    setDoneTasks(done);
    setOIutdatedTasks(outdated);
    setInProgressTasks(inProgress);
  });
  const [test, setTest] = useState('');
  const [isPopupActive, setIsPopupActive] = useState<boolean>(false);

  const onSubmit = function (task: ITask) {
    let newTasks;
    if (isOutdate(task.date)) {
      newTasks = [task, ...outdatedTasks];
      setOIutdatedTasks(newTasks);
    } else {
      newTasks = [task, ...inProgressTasks];
      setInProgressTasks(newTasks);
    }
    TaskService.post(task);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTaskHandler = function () {
    setIsPopupActive(true);
  };

  return (
    <div className="task">
      {/* <input
        value={test}
        onChange={(e) => {
          setTasks([]);
          setTest(e.target.value);
        }}
        type="text"
      /> */}
      <TaskColumn
        tasks={outdatedTasks}
        title="Outdated"
        isLoading={isTasksLoading}
        small
        headerVariant="red"
      />
      <TaskColumn
        tasks={inProgressTasks}
        isLoading={isTasksLoading}
        title="In Progress"
        main={{
          createTaskHandler,
          isPopupActive,
        }}
        headerVariant="yellow"
      />

      <TaskColumn
        isLoading={isTasksLoading}
        tasks={doneTasks}
        title="Done"
        small
        headerVariant="green"
      />
      <PopupTemplate
        onHideHandler={() => {
          setIsPopupActive(false);
        }}
        className="task__popup-wrapper"
        active={isPopupActive}
      >
        {<CreateTaskForm onSubmit={onSubmit} />}
      </PopupTemplate>
    </div>
  );
};

export default Tasks;

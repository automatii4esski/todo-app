import React, { useEffect, useMemo, useState } from 'react';
import { ITask, MyFC } from '../types/types';
import TaskColumn from '../components/TaskColumn';
import { getConcatClassName } from '../utils/getClassName';
import { TaskService } from '../API/TaskService';
import { useFetch } from '../hooks/useFetch';
import { useTasks } from '../hooks/useTasks';
import PopupTemplate from '../components/UI/popup/PopupTemplate';

const Tasks: MyFC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [doneTasks, setDoneTasks] = useState<ITask[]>([]);
  const [outdatedTasks, setOIutdatedTasks] = useState<ITask[]>([]);
  const [inProgressTasks, setInProgressTasks] = useState<ITask[]>([]);

  const [fetchTasks, isTasksLoading, tasksError] = useFetch(async () => {
    const response = await TaskService.getAll();
    setTasks(response.data);
    setDoneTasks(response.data.filter((task) => task.status === 'done'));
    setOIutdatedTasks(
      response.data.filter((task) => task.status === 'outdated')
    );
    setInProgressTasks(
      response.data.filter((task) => task.status === 'active')
    );
  });
  const [test, setTest] = useState('');
  const [isPopupActive, setIsPopupActive] = useState<boolean>(false);

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
        active={isPopupActive}
      />
    </div>
  );
};

export default Tasks;

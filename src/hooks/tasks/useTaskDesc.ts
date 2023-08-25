import { useState, useEffect } from 'react';
import { cutString } from '../../utils/cutString';
import { ITask, ITaskDesc } from '../../types/tasks';
import { initTaskDescValue } from '../../initValues/tasks';

export const useTaskDesc = function (
  taskData: ITask,
  limit: number
): [desc: ITaskDesc, setDesc: (desc: ITaskDesc) => void] {
  const [desc, setDesc] = useState<ITaskDesc>(initTaskDescValue);

  useEffect(() => {
    const taskDesc = cutString(taskData.desc, limit);
    setDesc({
      textToShow: taskDesc.stringSlice,
      sliceString: taskDesc.stringSlice,
      isShow: taskDesc.isCutted,
      subText: 'Show',
    });
  }, [taskData]);

  return [desc, setDesc];
};

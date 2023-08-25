import ProgressLine from '../UI/progressLine/ProgressLine';
import { MyFC } from '../../types/common';
import { ISingleProjectMicrotasksBot } from '../../types/singleProject';

const SingleProjectMicrotasksBot: MyFC<ISingleProjectMicrotasksBot> = ({
  data,
  onCreateTaskClick,
}) => {
  const progressLineWidth = (data.tasksDone / data.tasksTotal) * 100;
  const progressLineCount = `${data.tasksDone}/${data.tasksTotal}`;

  return (
    <div className="singleproject-microtasks__bottom">
      <ProgressLine
        className="singleproject-microtasks__progress"
        width={progressLineWidth}
        count={progressLineCount}
      />
      <button className="singleproject-microtasks__add">
        <span
          onClick={onCreateTaskClick}
          className="singleproject-microtasks__add-span"
        >
          +
        </span>
      </button>
    </div>
  );
};

export default SingleProjectMicrotasksBot;

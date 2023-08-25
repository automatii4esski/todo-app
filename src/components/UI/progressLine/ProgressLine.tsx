import { MyFC } from '../../../types/common';
import { getConcatClassName } from '../../../utils/getClassName';
import { MyProgressLineType } from '../../../types/UI';

const ProgressLine: MyFC<MyProgressLineType> = ({
  className,
  width,
  count,
  color = width < 100 ? 'yellow' : 'green',
}) => {
  return (
    <div className={getConcatClassName('progress', className)}>
      <div className="progress-text">Progress</div>
      <div className="progress-count">{count}</div>
      <div
        style={{
          width: `${width}%`,
        }}
        className={`progress-line progress-line--${color}`}
      ></div>
    </div>
  );
};

export default ProgressLine;

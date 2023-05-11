import React, { HtmlHTMLAttributes } from 'react';
import { MyFC } from '../../../types/types';
import { getConcatClassName } from '../../../utils/getClassName';

type Color = 'yellow' | 'green';

interface IProgressLine {
  count: string;
  width: number;
  color?: Color;
}

type ProgressLineProps = HtmlHTMLAttributes<any> & IProgressLine;

const ProgressLine: MyFC<ProgressLineProps> = ({
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

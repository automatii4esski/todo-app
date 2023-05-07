import React, { HtmlHTMLAttributes } from 'react';
import { MyFC } from '../../../types/types';
import { getConcatClassName } from '../../../utils/getClassName';

interface IProgressLine {
  count: string;
  width: number;
}

type ProgressLineProps = HtmlHTMLAttributes<any> & IProgressLine;

const ProgressLine: MyFC<ProgressLineProps> = ({ className, width, count }) => {
  return (
    <div className={getConcatClassName('progress', className)}>
      <div className="progress-text">Progress</div>
      <div className="progress-count">{count}</div>
      <div
        style={{
          width: `${width}%`,
        }}
        className="progress-line"
      ></div>
    </div>
  );
};

export default ProgressLine;

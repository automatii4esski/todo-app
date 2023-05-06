import React, { HtmlHTMLAttributes } from 'react';
import { MyFC } from '../../../types/types';
import { getConcatClassName } from '../../../utils/getClassName';

type DateElementProps = HtmlHTMLAttributes<any>;

const DateElement: MyFC<DateElementProps> = ({ children, className }) => {
  return (
    <div className={getConcatClassName('date', className)}>{children}</div>
  );
};

export default DateElement;

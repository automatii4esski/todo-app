import React from 'react';
import { MyFC } from '../../../types/types';
import { getConcatClassName } from '../../../utils/getClassName';

const DateElement: MyFC = ({ children, className }) => {
  return (
    <div className={getConcatClassName('date', className)}>{children}</div>
  );
};

export default DateElement;

import { HtmlHTMLAttributes } from 'react';
import { MyFC } from '../../../types/common';
import { getConcatClassName } from '../../../utils/getClassName';

const DateElement: MyFC<HtmlHTMLAttributes<any>> = ({
  children,
  className,
}) => {
  return (
    <div className={getConcatClassName('date', className)}>{children}</div>
  );
};

export default DateElement;

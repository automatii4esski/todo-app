import React, { SelectHTMLAttributes } from 'react';
import { getConcatClassName } from '../../../utils/getClassName';
import { ISortOption, MyFC, RefObj } from '../../../types/common';

interface IMySelect {
  options: ISortOption[];
  sort: string;
  onChange: (...args: any) => any;
  defaultText?: string;
}

type MySelectProps = SelectHTMLAttributes<any> &
  RefObj<HTMLInputElement> &
  IMySelect;

const MySelect: MyFC<MySelectProps> = ({
  className,
  options,
  sort,
  defaultText = 'Select sort',
  ...props
}) => {
  return (
    <select
      {...props}
      value={sort}
      className={getConcatClassName('select', className)}
    >
      <option className="option" disabled value="">
        {defaultText}
      </option>
      {options.map((option) => (
        <option className="option" key={option.value} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
};

export default MySelect;

import React, { SelectHTMLAttributes } from 'react';
import { getConcatClassName } from '../../../utils/getClassName';
import { ISortOption, MyFC, RefObj } from '../../../types/types';

interface IMySelect {
  options: ISortOption[];
  sort: string;
}

type MySelectProps = SelectHTMLAttributes<any> &
  RefObj<HTMLInputElement> &
  IMySelect;

const MySelect: MyFC<MySelectProps> = ({
  className,
  options,
  sort,
  ...props
}) => {
  return (
    <select
      {...props}
      value={sort}
      className={getConcatClassName('select', className)}
    >
      <option className="option" disabled value="">
        Select sort
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

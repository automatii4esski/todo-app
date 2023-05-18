import React, { InputHTMLAttributes } from 'react';
import { MyFC, RefObj } from '../../../types/common';
import { getConcatClassName } from '../../../utils/getClassName';

type MyInputProps = InputHTMLAttributes<any> & RefObj<HTMLInputElement>;

const MyInput: MyFC<MyInputProps> = ({ className, reference, ...props }) => {
  return (
    <input
      ref={reference}
      className={getConcatClassName('input', className)}
      {...props}
    />
  );
};

export default MyInput;

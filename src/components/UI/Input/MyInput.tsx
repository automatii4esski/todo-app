import React, { InputHTMLAttributes } from 'react';
import { MyFC, RefObj } from '../../../types/types';

type MyInputProps = InputHTMLAttributes<any> & RefObj<HTMLInputElement>;

const MyInput: MyFC<MyInputProps> = ({ className, reference, ...props }) => {
  return (
    <input
      ref={reference}
      className={`input${className ? ' ' + className : ''}`}
      {...props}
    />
  );
};

export default MyInput;

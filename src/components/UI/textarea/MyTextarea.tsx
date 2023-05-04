import React, { TextareaHTMLAttributes } from 'react';
import { MyFC, RefObj } from '../../../types/types';
import { getConcatClassName } from '../../../utils/getClassName';

type MyInputProps = TextareaHTMLAttributes<any> & RefObj<HTMLTextAreaElement>;

const MyTextarea: MyFC<MyInputProps> = ({ reference, className, ...props }) => {
  return (
    <textarea
      ref={reference}
      className={getConcatClassName('textarea', className)}
      {...props}
    ></textarea>
  );
};

export default MyTextarea;

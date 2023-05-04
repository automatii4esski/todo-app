import React, { ButtonHTMLAttributes } from 'react';
import { MyFC, RefObj } from '../../../types/types';
import { getConcatClassName } from '../../../utils/getClassName';

type MyButtonProps = ButtonHTMLAttributes<any> & RefObj<HTMLButtonElement>;

const MyButton: MyFC<MyButtonProps> = ({
  reference,
  className,
  children,
  ...props
}) => {
  return (
    <button
      ref={reference}
      className={getConcatClassName('button', className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default MyButton;

import React, { ButtonHTMLAttributes } from 'react';
import { getConcatClassName } from '../../../utils/getClassName';
import { MyFC, RefObj } from '../../../types/types';

type MyRoundButtonProps = ButtonHTMLAttributes<any> & RefObj<HTMLInputElement>;

const RoundButton: MyFC<MyRoundButtonProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      className={getConcatClassName('round-button', className)}
    >
      {children}
    </button>
  );
};

export default RoundButton;

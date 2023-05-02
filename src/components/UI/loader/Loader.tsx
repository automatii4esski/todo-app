import React, { HTMLAttributes } from 'react';
import { MyFC } from '../../../types/types';
import { getConcatClassName } from '../../../utils/getClassName';

const Loader: MyFC<HTMLAttributes<HTMLElement>> = ({ className }) => {
  return <div className={getConcatClassName('loader', className)}></div>;
};

export default Loader;

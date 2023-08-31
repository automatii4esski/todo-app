import { FC } from 'react';
import { IErrorMessage, MyFC } from '../../../types/common';

const Error: MyFC<IErrorMessage> = ({ text }) => {
  return <p className="error-message">{text}</p>;
};

export default Error;

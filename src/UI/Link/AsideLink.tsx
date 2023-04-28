import React from 'react';
import { myFC } from '../../types/types';
import { Link } from 'react-router-dom';

interface IAsideLink {
  to: string;
  className?: string;
}

const AsideLink: myFC<IAsideLink> = ({
  children,
  className,
  ...otherProps
}) => {
  return (
    <Link
      className={`aside__link${className ? ' ' + className : ''}`}
      {...otherProps}
    >
      {children}
    </Link>
  );
};

export default AsideLink;

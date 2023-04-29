import React from 'react';
import AsideLink from './UI/Link/AsideLink';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../images/icons/logo.svg';
import { ReactComponent as UserIcon } from '../images/icons/user.svg';
import { ReactComponent as GraphIcon } from '../images/icons/graph.svg';
import { ReactComponent as SettingsIcon } from '../images/icons/settings.svg';
import { ReactComponent as LogoutIcon } from '../images/icons/logout.svg';
import { MyFC } from '../types/types';

interface IAsideLinkProps {
  to: string;
  element: React.ReactNode;
  className?: string;
}

const asideLinkProps: IAsideLinkProps[] = [
  {
    to: '/user',
    element: <UserIcon />,
  },
  {
    to: '/graph',
    element: <GraphIcon />,
  },
  {
    to: '/settings',
    element: <SettingsIcon />,
  },
  {
    to: '',
    element: <LogoutIcon />,
    className: 'aside__link-logout',
  },
];

const Aside: MyFC = () => {
  return (
    <div className="aside">
      <Link className="aside__logo" to="">
        <Logo />
      </Link>
      {asideLinkProps.map((link, i) => (
        <AsideLink className={link.className || ''} to={link.to} key={i}>
          {link.element}
        </AsideLink>
      ))}
    </div>
  );
};

export default Aside;

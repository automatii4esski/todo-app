import React from 'react';
import { ReactComponent as UserIcon } from '../images/icons/user.svg';
import { ReactComponent as GraphIcon } from '../images/icons/graph.svg';
import { ReactComponent as SettingsIcon } from '../images/icons/settings.svg';
import { ReactComponent as LogoutIcon } from '../images/icons/logout.svg';

interface IAsideLinkProps {
  to: string;
  element: React.ComponentType<any>;
  className?: string;
}

export const asideLinkProps: IAsideLinkProps[] = [
  {
    to: '/user',
    element: UserIcon,
  },
  {
    to: '/tasks',
    element: GraphIcon,
  },
  {
    to: '/projects',
    element: SettingsIcon,
  },
  {
    to: '',
    element: LogoutIcon,
    className: 'aside__link-logout',
  },
];

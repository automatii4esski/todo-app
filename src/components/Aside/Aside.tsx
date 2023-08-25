import AsideLink from '../UI/link/AsideLink';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../images/icons/logo.svg';

import { MyFC } from '../../types/common';
import { asideLinkProps } from '../../values/aside';

const Aside: MyFC = () => {
  return (
    <div className="aside">
      <Link className="aside__logo" to="">
        <Logo />
      </Link>
      {asideLinkProps.map((link, i) => (
        <AsideLink className={link.className || ''} to={link.to} key={i}>
          {<link.element />}
        </AsideLink>
      ))}
    </div>
  );
};

export default Aside;

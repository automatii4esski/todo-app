import { MyFC } from '../../../types/common';
import { getConcatClassName } from '../../../utils/getClassName';
import { LinkProps, Link } from 'react-router-dom';

const AsideLink: MyFC<LinkProps> = ({ children, className, ...otherProps }) => {
  return (
    <Link
      className={getConcatClassName('aside__link', className)}
      {...otherProps}
    >
      {children}
    </Link>
  );
};

export default AsideLink;

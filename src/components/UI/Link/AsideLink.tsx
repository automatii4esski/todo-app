import { MyFC, RefObj } from '../../../types/common';
import { getConcatClassName } from '../../../utils/getClassName';
import { LinkProps, Link } from 'react-router-dom';

type MyAsideLinkProps = LinkProps;

const AsideLink: MyFC<MyAsideLinkProps> = ({
  children,
  className,
  ...otherProps
}) => {
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

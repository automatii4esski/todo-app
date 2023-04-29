import { MyFC, RefObj } from '../../../types/types';
import { getConcatClassName } from '../../../utils/getClassName';
import { LinkProps, Link } from 'react-router-dom';

type MyAsideLinkProps = LinkProps & RefObj<HTMLAnchorElement>;

const AsideLink: MyFC<MyAsideLinkProps> = ({
  children,
  className,
  reference,
  ...otherProps
}) => {
  return (
    <Link
      className={getConcatClassName('aside__link', className)}
      ref={reference}
      {...otherProps}
    >
      {children}
    </Link>
  );
};

export default AsideLink;

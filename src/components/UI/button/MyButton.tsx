import { MyButtonType } from '../../../types/UI';
import { MyFC } from '../../../types/common';
import { getConcatClassName } from '../../../utils/getClassName';

const MyButton: MyFC<MyButtonType> = ({
  reference,
  className,
  children,
  ...props
}) => {
  return (
    <button
      ref={reference}
      className={getConcatClassName('button', className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default MyButton;

import { getConcatClassName } from '../../../utils/getClassName';
import { MyFC } from '../../../types/common';
import { MyButtonType } from '../../../types/UI';

const RoundButton: MyFC<MyButtonType> = ({ className, children, ...props }) => {
  return (
    <button
      {...props}
      className={getConcatClassName('round-button', className)}
    >
      {children}
    </button>
  );
};

export default RoundButton;

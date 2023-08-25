import { MyFC } from '../../../types/common';
import { getConcatClassName } from '../../../utils/getClassName';
import { MyInputType } from '../../../types/UI';

const MyInput: MyFC<MyInputType> = ({ className, reference, ...props }) => {
  return (
    <input
      ref={reference}
      className={getConcatClassName('input', className)}
      {...props}
    />
  );
};

export default MyInput;

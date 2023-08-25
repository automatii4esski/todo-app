import { MyFC } from '../../../types/common';
import { getConcatClassName } from '../../../utils/getClassName';
import { MyTextAreaType } from '../../../types/UI';

const MyTextarea: MyFC<MyTextAreaType> = ({
  reference,
  className,
  ...props
}) => {
  return (
    <textarea
      ref={reference}
      className={getConcatClassName('textarea', className)}
      {...props}
    ></textarea>
  );
};

export default MyTextarea;

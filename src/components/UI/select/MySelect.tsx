import { getConcatClassName } from '../../../utils/getClassName';
import { MyFC } from '../../../types/common';
import { MySelectType } from '../../../types/UI';

const MySelect: MyFC<MySelectType> = ({
  className,
  options,
  sort,
  defaultText = 'Select sort',
  ...props
}) => {
  return (
    <select
      value={sort}
      {...props}
      className={getConcatClassName('select', className)}
    >
      <option className="option" disabled value="">
        {defaultText}
      </option>
      {options.map((option) => (
        <option className="option" key={option.value} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
};

export default MySelect;

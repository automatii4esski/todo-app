import { FC } from 'react';
import { MyFC } from '../../../types/common';
import { IColorsRadio } from '../../../types/UI';
import { projectColors } from '../../../values/colors';

const ColorsRadio: MyFC<IColorsRadio> = ({ defaultValue }) => {
  const onChange = function () {};
  return (
    <>
      {projectColors.map((color) => (
        <input
          key={color}
          className={`create__color-radio create__color-radio--${color}`}
          name="color"
          onChange={onChange}
          checked={defaultValue === color}
          value={color}
          type="radio"
        />
      ))}
    </>
  );
};

export default ColorsRadio;

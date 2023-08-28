import { FC } from 'react';
import { MyFC } from '../../../types/common';
import { IColorsRadio } from '../../../types/UI';
import { projectColors } from '../../../values/colors';

const ColorsRadio: MyFC<IColorsRadio> = ({ defaultValue }) => {
  return (
    <>
      {projectColors.map((color) => (
        <input
          key={color}
          className={`create__color-radio create__color-radio--${color}`}
          name="color"
          defaultChecked={defaultValue === color}
          value={color}
          type="radio"
        />
      ))}
    </>
  );
};

export default ColorsRadio;

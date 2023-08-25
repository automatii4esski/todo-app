import { MouseEvent, useState } from 'react';
import { MyFC } from '../../../types/common';
import {
  getAdditionClassName,
  getConcatClassName,
} from '../../../utils/getClassName';
import { MyPopupType } from '../../../types/UI';

const PopupTemplate: MyFC<MyPopupType> = ({
  children,
  active,
  className,
  onHideHandler,
}) => {
  const onContentClick = function (e: MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
  };

  return (
    <div
      onClick={onHideHandler}
      className={getAdditionClassName('popup', active)}
    >
      <div
        onClick={onContentClick}
        className={getConcatClassName('popup__content', className)}
      >
        {children}
      </div>
    </div>
  );
};

export default PopupTemplate;

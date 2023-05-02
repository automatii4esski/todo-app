import React, { HTMLAttributes } from 'react';
import { MyFC } from '../../../types/types';
import { getAdditionClassName } from '../../../utils/getClassName';

interface IPopup {
  active: boolean;
  onHideHandler: (...args: any) => any;
}

type PopupProps = HTMLAttributes<HTMLElement> & IPopup;

const PopupTemplate: MyFC<PopupProps> = ({
  children,
  active,
  onHideHandler,
}) => {
  return (
    <div
      onClick={onHideHandler}
      className={getAdditionClassName('popup', active)}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="popup__content"
      >
        {children}
      </div>
    </div>
  );
};

export default PopupTemplate;

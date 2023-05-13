import React from 'react';
import RoundButton from '../UI/button/RoundButton';
import { ReactComponent as DeleteIcon } from '../../images/icons/cross.svg';
import { MyFC } from '../../types/types';

interface ICreateProjectFormTask {
  onDelete: (id: number) => void;
}

const CreateProjectTaskForm: MyFC<ICreateProjectFormTask> = ({
  children,
  onDelete,
}) => {
  return (
    <div className="create-project__tasks-item">
      <p className="create-project__tasks-desc">{children}</p>
      <RoundButton className="create-project__tasks-delete">
        <DeleteIcon onClick={onDelete} />
      </RoundButton>
    </div>
  );
};

export default CreateProjectTaskForm;

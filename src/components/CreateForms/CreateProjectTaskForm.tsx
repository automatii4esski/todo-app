import RoundButton from '../UI/button/RoundButton';
import { ReactComponent as DeleteIcon } from '../../images/icons/cross.svg';
import { MyFC } from '../../types/common';
import { ICreateProjectTaskForm } from '../../types/singleProject';

const CreateProjectTaskForm: MyFC<ICreateProjectTaskForm> = ({
  children,
  onDelete,
  id,
}) => {
  const onDeleteClick = function () {
    onDelete(id);
  };

  return (
    <div className="create-project__tasks-item">
      <p className="create-project__tasks-desc">{children}</p>
      <RoundButton className="create-project__tasks-delete">
        <DeleteIcon onClick={onDeleteClick} />
      </RoundButton>
    </div>
  );
};

export default CreateProjectTaskForm;

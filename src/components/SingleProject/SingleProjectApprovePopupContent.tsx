import { FC, useContext } from 'react';
import { MyFC } from '../../types/common';
import MyButton from '../UI/button/MyButton';
import { ISingleProjectApprovePopupContent } from '../../types/singleProject';
import {
  userDataContext,
  addToTotalProjectsDone,
} from '../../context/totalTasksAndProjectsDoneContext/UserDataContext';
import { UserService } from '../../API/UserService';
import { ProjectService } from '../../API/ProjectService';
import { useNavigate } from 'react-router-dom';
import {
  deleteProjectById,
  projectsContext,
  setIsAllowedToLoad,
} from '../../context/projectsContext/ProjectsContext';

const SingleProjectApprovePopupContent: MyFC<
  ISingleProjectApprovePopupContent
> = ({ projectID, type: operationType, onDeclineClick }) => {
  const { dispatch: projectDispatch, value: state } =
    useContext(projectsContext)!;
  const { value: userState, dispatch: userDispatch } =
    useContext(userDataContext)!;
  const navigate = useNavigate();

  const onApproveClick = function () {
    if (operationType === 'complete') {
      userDispatch(addToTotalProjectsDone());
      UserService.updateTotalProjectsDone(userState.projectsDone + 1);
    }
    projectDispatch(setIsAllowedToLoad(false));
    projectDispatch(deleteProjectById(projectID));
    ProjectService.deleteProject(projectID);
    navigate('/projects');
  };

  return (
    <div className="singleproject__popup">
      <h4 className="singleproject__popup-title">
        {operationType} this project?
      </h4>
      <div className="singleproject__popup-btns">
        <MyButton
          onClick={onApproveClick}
          className="singleproject__popup-btn singleproject__popup-approve"
        >
          Yes
        </MyButton>
        <MyButton
          onClick={onDeclineClick}
          className="singleproject__popup-btn "
        >
          No
        </MyButton>
      </div>
    </div>
  );
};

export default SingleProjectApprovePopupContent;

import React, { useState, useEffect, useContext, ChangeEvent } from 'react';
import DateElement from '../components/UI/date/DateElement';
import { getDate } from '../utils/getDate';
import MyButtonType from '../components/UI/button/MyButton';

import ProgressLine from '../components/UI/progressLine/ProgressLine';
import SingleProjectTask from '../components/SingleProject/SingleProjectTask';
import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { ProjectService } from '../API/ProjectService';
import Loader from '../components/UI/loader/Loader';
import MyTextarea from '../components/UI/textarea/MyTextarea';
import SingleProjectDescription from '../components/SingleProject/SingleProjectDescription';
import SingleProjectMicrotasks from '../components/SingleProject/SingleProjectMicrotasks';
import { IProject, IProjectTask, ProgectTaskStatus } from '../types/project';
import { initProjectValue } from '../initValues/singleProject';
import { useFetchProject } from '../hooks/singleProject/useFetchProject';
import { getTaskMethods } from '../utils/singleProject/taskMethods';
import { getTaskFormCallbackMethods } from '../utils/singleProject/taskFormCallbackMethods';
import MyButton from '../components/UI/button/MyButton';
import PopupTemplate from '../components/UI/popup/PopupTemplate';
import SingleProjectApprovePopupContent from '../components/SingleProject/SingleProjectApprovePopupContent';
import { ISingleProjectApprovePopupContent } from '../types/singleProject';
import {
  projectsContext,
  setIsAllowedToLoad,
  setProjectIndex,
  setProjects,
  updateSingleProject,
} from '../context/projectsContext/ProjectsContext';
import { getProjectPriorityColor } from '../utils/projects/getProjectPriorityColor';
import EditProjectForm from '../components/CreateForms/EditProjectForm';

const SingleProjectPage = () => {
  const [data, setData] = useState<IProject>(initProjectValue);
  const [popupStatus, setPopupStatus] = useState<{
    status: boolean;
    type: ISingleProjectApprovePopupContent['type'];
  }>({ status: false, type: 'complete' });
  const { id } = useParams();
  const [popuptTypeContent, setPopuptTypeContent] = useState<
    'approve' | 'edit'
  >('approve');
  const [isLoading, error] = useFetchProject(setData, id as string);
  const { dispatch, value } = useContext(projectsContext)!;

  useEffect(() => {
    dispatch(setProjectIndex(data.id));
  }, [data.id]);

  useEffect(() => {
    dispatch(updateSingleProject(data));
  }, [data]);

  if (isLoading) {
    return (
      <div className="singleproject__loader-wrapper">
        <Loader></Loader>
      </div>
    );
  }

  const taskMethods = getTaskMethods(data, setData, id as string);
  const taskFormCallbackMethods = getTaskFormCallbackMethods(
    data,
    setData,
    id as string
  );

  const onCompleteClick = function () {
    setPopupStatus({ status: true, type: 'complete' });
    setPopuptTypeContent('approve');
  };

  const onDeleteClick = function () {
    setPopupStatus({ status: true, type: 'delete' });
    setPopuptTypeContent('approve');
  };

  const onHidePopup = function () {
    setPopupStatus({ status: false, type: 'delete' });
  };

  const onEditProjectClick = function () {
    setPopupStatus({ status: true, type: 'delete' });
    setPopuptTypeContent('edit');
  };

  const onEditSubmit = function (project: IProject) {
    setPopupStatus({ status: false, type: 'delete' });
    setData(project);
    ProjectService.putById(project);
  };

  const popupContents = {
    edit: <EditProjectForm initProject={data} onEditSubmit={onEditSubmit} />,
    approve: (
      <SingleProjectApprovePopupContent
        type={popupStatus.type}
        projectID={+id!}
        onDeclineClick={onHidePopup}
      />
    ),
  };

  return (
    <div className="singleproject">
      <div className="singleproject__content">
        <div className="singleproject__info">
          <h2
            className={`singleproject__title singleproject__title--${data.color}`}
          >
            {data.title}
          </h2>
          <SingleProjectDescription project={data} />
          <div className="singleproject__info-bottom">
            <div className="singleproject__bottom-box">
              <div className="singleproject__date">
                <div className="singleproject__date-text">Deadline:</div>
                <DateElement>{getDate(Date.now())}</DateElement>
              </div>
              <div className="singleproject__priority">
                <div className="singleproject__priority-text">Priority:</div>
                <div
                  className={`singleproject__priority-value singleproject__priority-value--${getProjectPriorityColor(
                    data.priority
                  )}`}
                >
                  {data.priority}
                </div>
              </div>
              <MyButton onClick={onEditProjectClick}>Edit project</MyButton>
            </div>

            <div className="singleproject__actions">
              <MyButton
                onClick={onCompleteClick}
                className="singleproject__actions-btn singleproject__actions-complete"
              >
                Complete
              </MyButton>
              <MyButton
                onClick={onDeleteClick}
                className="singleproject__actions-btn singleproject__actions-delete"
              >
                Delete
              </MyButton>
            </div>
          </div>
        </div>
        <SingleProjectMicrotasks
          taskMethods={taskMethods}
          taskFormCallbackMethods={taskFormCallbackMethods}
          data={data}
        />
      </div>
      <PopupTemplate onHideHandler={onHidePopup} active={popupStatus.status}>
        {popupContents[popuptTypeContent]}
      </PopupTemplate>
    </div>
  );
};

export default SingleProjectPage;

import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
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

const SingleProjectPage = () => {
  const [data, setData] = useState<IProject>(initProjectValue);
  const [popupStatus, setPopupStatus] = useState<{
    status: boolean;
    type: ISingleProjectApprovePopupContent['type'];
  }>({ status: false, type: 'complete' });
  const { id } = useParams();
  const [isLoading, error] = useFetchProject(setData, id as string);

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

  const onSubmitAdditionalDesc = function (newDesc: string) {
    const newData = {
      ...data,
      additionalDescs: [
        ...data.additionalDescs,
        {
          date: Date.now(),
          text: newDesc,
        },
      ],
    };
    setData(newData);
    ProjectService.putById(newData);
  };

  const onCompleteClick = function () {
    setPopupStatus({ status: true, type: 'complete' });
  };

  const onDeleteClick = function () {
    setPopupStatus({ status: true, type: 'delete' });
  };

  const onHidePopup = function () {
    setPopupStatus({ status: false, type: 'delete' });
  };

  return (
    <div className="singleproject">
      <div className="singleproject__content">
        <div className="singleproject__info">
          <h2 className="singleproject__title">{data.title}</h2>
          <SingleProjectDescription
            desc={data.desc}
            additionalDescs={data.additionalDescs}
            onSubmitAdditionalDesc={onSubmitAdditionalDesc}
          />
          <div className="singleproject__info-bottom">
            <div className="singleproject__date">
              <div className="singleproject__date-text">Deadline:</div>
              <DateElement>{getDate(Date.now())}</DateElement>
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
        <SingleProjectApprovePopupContent
          type={popupStatus.type}
          projectID={+id!}
          onDeclineClick={onHidePopup}
        />
      </PopupTemplate>
    </div>
  );
};

export default SingleProjectPage;

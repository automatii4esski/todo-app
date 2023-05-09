import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import DateElement from '../components/UI/date/DateElement';
import { getDate } from '../utils/getDate';
import MyButton from '../components/UI/button/MyButton';

import ProgressLine from '../components/UI/progressLine/ProgressLine';
import SingleProjectTask from '../components/SingleProjectTask';
import { useParams } from 'react-router-dom';
import { IProject } from '../types/types';
import { useFetch } from '../hooks/useFetch';
import { ProjectService } from '../API/ProjectService';
import Loader from '../components/UI/loader/Loader';
import MyTextarea from '../components/UI/textarea/MyTextarea';

const plugData: IProject = {
  id: 0,
  deadline: Date.now(),
  desc: '',
  title: '',
  tasks: [],
  additionalDescs: [],
  tasksTotal: 0,
  tasksDone: 0,
};

const SingleProjectPage = () => {
  const [data, setData] = useState<IProject>(plugData);
  const { id } = useParams();

  const [fetchProject, isLoading, error] = useFetch(async () => {
    const response = await ProjectService.getById(id as string);
    setData(response.data[0]);
  });

  const additioanalDescInputRef = useRef<HTMLTextAreaElement>(null);

  const [additionalDescClass, setAdditionalDescClass] = useState({
    button: '',
    input: 'disabled',
  });

  useEffect(() => {
    fetchProject();
  }, []);

  if (isLoading) {
    return (
      <div className="singleproject__loader-wrapper">
        <Loader></Loader>
      </div>
    );
  }

  const onCloseAdditionalDesc = function () {
    setAdditionalDescClass({
      button: '',
      input: 'disabled',
    });

    additioanalDescInputRef.current!.value = '';
  };

  const onSubmitAdditionalDesc = function (e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setAdditionalDescClass({
      button: '',
      input: 'disabled',
    });

    if (!additioanalDescInputRef.current!.value) return;

    const newData = {
      ...data,
      additionalDescs: [
        ...data.additionalDescs,
        {
          date: Date.now(),
          text: additioanalDescInputRef.current!.value,
        },
      ],
    };
    additioanalDescInputRef.current!.value = '';
    setData(newData);
    ProjectService.putById(newData);
  };

  const addAdditionalDesc = function () {
    setAdditionalDescClass({
      button: 'disabled',
      input: '',
    });
    additioanalDescInputRef.current?.focus();
  };

  return (
    <div className="singleproject">
      <div className="singleproject__content">
        <div className="singleproject__info">
          <h2 className="singleproject__title">{data.title}</h2>

          <div className="singleproject__description">
            <h3 className="singleproject__sub-title singleproject__description-title">
              Description
            </h3>
            <p className="singleproject__description-text">{data.desc}</p>
            {data.additionalDescs.map((desc) => (
              <p
                key={desc.date}
                className="singleproject__description-addition"
              >
                <span className="singleproject__description-date">
                  {getDate(desc.date)}
                </span>
                {desc.text}
              </p>
            ))}
          </div>
          <div
            className={`singleproject__description-box ${additionalDescClass.button}`}
          >
            <button
              onClick={addAdditionalDesc}
              className="singleproject__description-add"
            >
              +
            </button>
          </div>
          <div className={additionalDescClass.input}>
            <form
              className="singleproject__description-form"
              onSubmit={onSubmitAdditionalDesc}
            >
              <MyTextarea
                reference={additioanalDescInputRef}
                className={`singleproject__description-input`}
                placeholder="Type desc"
              />
              <div className="singleproject__description-btns">
                <button
                  className="singleproject__description-submit"
                  type="submit"
                >
                  Add
                </button>
                <button
                  onClick={onCloseAdditionalDesc}
                  className="singleproject__description-close"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
          <div className="singleproject__info-bottom">
            <div className="singleproject__date">
              <div className="singleproject__date-text">Deadline:</div>
              <DateElement>{getDate(Date.now())}</DateElement>
            </div>
            <div className="singleproject__actions">
              <MyButton className="singleproject__actions-btn singleproject__actions-complete">
                Complete
              </MyButton>
              <MyButton className="singleproject__actions-btn singleproject__actions-delete">
                Delete
              </MyButton>
            </div>
          </div>
        </div>
        <div className="singleproject-microtasks">
          <h3 className="singleproject__sub-title singleproject-microtasks__title">
            Microtasks
          </h3>
          <div className="singleproject-microtasks__filter">
            <div className="singleproject-microtasks__filter-item">Done</div>
            <div className="singleproject-microtasks__filter-item">
              In progress
            </div>
            <div className="singleproject-microtasks__filter-item">All</div>
          </div>
          <div className="singleproject-microtasks__content-wrapper">
            <div className="singleproject-microtasks__content"></div>
            <div className="singleproject-microtasks__bottom">
              <ProgressLine
                className="singleproject-microtasks__progress"
                width={0}
                count="1/10"
              />
              <button className="singleproject-microtasks__add">
                <span className="singleproject-microtasks__add-span">+</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProjectPage;

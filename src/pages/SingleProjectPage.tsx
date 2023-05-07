import React from 'react';
import DateElement from '../components/UI/date/DateElement';
import { getDate } from '../utils/getDate';
import MyButton from '../components/UI/button/MyButton';

import ProgressLine from '../components/UI/progressLine/ProgressLine';
import SingleProjectTask from '../components/SingleProjectTask';

const SingleProjectPage = () => {
  return (
    <div className="singleproject">
      <div className="singleproject__content">
        <div className="singleproject__info">
          <div className="singleproject__description">
            <h2 className="singleproject__title">Title</h2>
            <h3 className="singleproject__sub-title singleproject__description-title">
              Description
            </h3>
            <p className="singleproject__description-text">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur
              laborum, corporis eaque iure incidunt cupiditate impedit dicta
              ullam accusamus magnam at quibusdam molestias exercitationem aut
              odio voluptate ex ab quidem?
            </p>
            <p className="singleproject__description-addition">
              <span className="singleproject__description-date">
                Added at 22
              </span>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error,
              fugit fuga culpa pariatur unde tempore quis aliquid sequi
              assumenda autem animi, debitis explicabo rerum voluptates fugiat
              inventore non odio veritatis!
            </p>
            <div className="singleproject__description-box">
              <button className="singleproject__description-add">+</button>
            </div>
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

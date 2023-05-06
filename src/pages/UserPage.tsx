import React from 'react';
import { MyFC } from '../types/types';
import Avatar from '../images/content/avatar.jpg';

const UserPage: MyFC = () => {
  return (
    <div className="user">
      <div className="user-info">
        <div className="user-info__top">
          <div className="user-info__avatar">
            <img className="user-info__avatar-img" src={Avatar} alt="avatar" />
          </div>
          <div className="user-info__nickname">Ivan</div>
        </div>
        <div className="user-info__data">
          <div className="user__item user-info__item">
            <div className="user__name user-info__name">Password:</div>
            <div className="user-info__text">12312312</div>
          </div>
          <div className="user__item  user-info__item">
            <div className="user__name user-info__name">Date Registration:</div>
            <div className="user-info__text">12312312</div>
          </div>
        </div>
      </div>
      <div className="user-tasks">
        <div className="user-tasks__item user-tasks__tasks">
          <h3 className="user-tasks__title">Tasks</h3>
          <div className="user-tasks__item-content">
            <div className="user__item user-tasks__content-item">
              <div className="user__name">Total done:</div>
              <div className="user__count">
                <span className="user__count-value"></span> 3
              </div>
            </div>
          </div>
        </div>
        <div className="user-tasks__item user-tasks__projects">
          <h3 className="user-tasks__title">Projects</h3>
          <div className="user-tasks__item-content">
            <div className="user__item user-tasks__content-item">
              <div className="user__name">Total done:</div>
              <div className="user__count">
                <span className="user__count-value"></span> 3
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;

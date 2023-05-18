import Avatar from '../../images/content/avatar.jpg';
import React, { useState, useRef, useEffect, ReactEventHandler } from 'react';
import { ReactComponent as SearchIcon } from '../../images/icons/search.svg';
import { ReactComponent as CalendarIcon } from '../../images/icons/calendar.svg';
import MyInput from '../UI/Input/MyInput';
import { getAdditionClassName } from '../../utils/getClassName';
import { useInput } from '../../hooks/useInput';
import { MyFC } from '../../types/common';
import { getDate } from '../../utils/getDate';
import { Link } from 'react-router-dom';

const HeaderService: MyFC = () => {
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchValue, onSearchChange] = useInput();
  const calendarDate = useRef<HTMLDivElement>(null);

  useEffect(() => {
    calendarDate.current!.textContent = getDate(Date.now());
  }, []);

  const onSearchIconClick = function () {
    setIsSearchActive(true);
    searchRef.current?.focus();
  };

  const onSearchBlur = function () {
    setIsSearchActive(false);
  };

  return (
    <div className="header-service">
      <form className="header-service__item header-service__form">
        <SearchIcon
          onClick={onSearchIconClick}
          className={getAdditionClassName(
            'header-service__search-icon',
            isSearchActive
          )}
        />
        <MyInput
          reference={searchRef}
          onBlur={onSearchBlur}
          onChange={onSearchChange}
          className={getAdditionClassName(
            'header-service__search',
            isSearchActive
          )}
          type="text"
        />
      </form>
      <div className="header-service__item header-service__calendar">
        <CalendarIcon className="header-service__calendar-icon" />
        <div ref={calendarDate} className="header-service__calendar-date"></div>
      </div>
      <Link className="header-service__user" to="/user">
        <img src={Avatar} alt="avatar" />
      </Link>
    </div>
  );
};

export default HeaderService;

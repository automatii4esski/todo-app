import { useReducer, Reducer } from 'react';
import { IContextProvider, UserDataContext, MyFC } from '../../types/common';
import { userDataContext } from './UserDataContext';

const UserDataContextProvider: MyFC<IContextProvider<UserDataContext>> = ({
  reducer,
  children,
}) => {
  const { value: state, dispatch } = reducer;

  return (
    <userDataContext.Provider value={{ value: state, dispatch }}>
      {children}
    </userDataContext.Provider>
  );
};

export default UserDataContextProvider;

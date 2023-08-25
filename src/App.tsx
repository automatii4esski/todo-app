import Aside from './components/Aside/Aside';
import Header from './components/Header/Header';
import TasksPage from './pages/TasksPage';
import './style/main.scss';
import { useReducer, useEffect, useContext, Reducer } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import UserPage from './pages/UserPage';
import ProjectsPage from './pages/ProjectsPage';
import SingleProjectPage from './pages/SingleProjectPage';
import { createContext } from 'vm';
import { useFetch } from './hooks/useFetch';
import { UserService } from './API/UserService';
import UserDataContextProvider from './context/totalTasksAndProjectsDoneContext/UserDataContextProvider';
import ProjectsContextProvider from './context/projectsContext/ProjectsContextProvider';
import { userDataContext } from './context/totalTasksAndProjectsDoneContext/UserDataContext';
import { IProjectsContext } from './types/common';
import { useProjectReducer, useUserDataReducer } from './hooks/useReducer';

function App() {
  const projectReducer = useProjectReducer();
  const userDataReducer = useUserDataReducer();

  return (
    <UserDataContextProvider reducer={userDataReducer}>
      <BrowserRouter>
        <div className="App">
          <div className="wrapper">
            <Aside />
            <div className="content">
              <Header />
              <div className="page">
                <Routes>
                  <Route path="/user" element={<UserPage />}></Route>
                  <Route path="/tasks" element={<TasksPage />}></Route>
                  <Route
                    element={
                      <ProjectsContextProvider reducer={projectReducer} />
                    }
                  >
                    <Route
                      path="/projects/:id"
                      element={<SingleProjectPage />}
                    />
                    <Route path="/projects" element={<ProjectsPage />} />
                  </Route>

                  <Route path="*" element={<Navigate to="/tasks" />}></Route>
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </UserDataContextProvider>
  );
}

export default App;

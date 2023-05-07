import Aside from './components/Aside';
import Header from './components/Header';
import TasksPage from './pages/TasksPage';
import './style/main.scss';
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import UserPage from './pages/UserPage';
import ProjectsPage from './pages/ProjectsPage';
import SingleProjectPage from './pages/SingleProjectPage';

function App() {
  return (
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
                <Route path="/projects" element={<ProjectsPage />}></Route>
                <Route
                  path="/projects/:id"
                  element={<SingleProjectPage />}
                ></Route>
                <Route path="*" element={<Navigate to="/tasks" />}></Route>
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

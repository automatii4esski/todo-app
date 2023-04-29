import Aside from './components/Aside';
import Header from './components/Header';
import Tasks from './pages/Tasks';
import './style/main.scss';
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

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
                <Route path="/user" element={<h1>user</h1>}></Route>
                <Route path="/tasks" element={<Tasks />}></Route>
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

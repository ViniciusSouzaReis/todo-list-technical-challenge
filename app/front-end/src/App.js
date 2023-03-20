import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import UserTasks from './pages/UserTasks';
import Register from './pages/Register';

import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Navigate to="/login" /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/:name/tasks" element={ <UserTasks />} />
      <Route path="/register" element={ <Register /> } />
    </Routes>
  );
}

export default App;

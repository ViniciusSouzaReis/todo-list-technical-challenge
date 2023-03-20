import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { readStorage } from '../utils/localStorage';
import NavBar from '../components/NavBar';
import TaskList from '../components/TaskList';

function UserTasks() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = readStorage();

    if (!user.name) navigate('/login');
  },[navigate]);

  return (
    <main>
      <NavBar />
      <TaskList />
    </main>
  );
};

export default UserTasks;
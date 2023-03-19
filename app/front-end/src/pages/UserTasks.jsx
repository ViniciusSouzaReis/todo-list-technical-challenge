import React from 'react';
import NavBar from '../components/NavBar';
import TaskList from '../components/TaskList';

function UserTasks() {
  return (
    <main>
      <NavBar />
      <TaskList />
    </main>
  );
};

export default UserTasks;
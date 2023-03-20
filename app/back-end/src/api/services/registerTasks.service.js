const { UserTasks } = require('../../database/models');

const createTask = async (id, data) => {
  const newTask = {
    user_id: id,
    task: data,
  }

  await UserTasks.create(newTask);

  return { type: 201, message: 'Task created' };
};

module.exports = {
  createTask,
};
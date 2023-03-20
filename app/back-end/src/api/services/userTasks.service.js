const { UserTasks } = require('../../database/models');

const getUserTasks = async (id) => {
  const getUser = await UserTasks.findAll({ 
    where: { user_id: id },
    attributes: { exclude: ['user_id', 'userId'] },
  });

  if (getUser.length < 1) return {type: 404, message: 'Tasks not found'};

  return {type: 200, message: getUser};
};

const createTask = async (id, data) => {
  const newTask = {
    user_id: id,
    task: data,
  }

  await UserTasks.create(newTask);

  return { type: 201, message: 'Task created' };
};

module.exports = {
  getUserTasks,
  createTask,
}
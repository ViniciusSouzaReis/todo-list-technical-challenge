const { UserTasks } = require('../../database/models');

const getUserTasks = async (id) => {
  const getUser = await UserTasks.findAll({ 
    where: { user_id: id },
    attributes: { exclude: ['user_id', 'userId'] },
  });

  if (getUser.length < 1) return {type: 404, message: 'Tasks not found'};

  return {type: 200, message: getUser};
};

const checkExistTask = async (data) => {
  const getTask = await UserTasks.findOne({ where: { task: data } });
  return getTask;
};

const createTask = async (id, data) => {
  const checkTask = await checkExistTask(data);

  if(checkTask) return { type: 409, message: 'Task already exists!'  }

  const newTask = {
    user_id: id,
    task: data,
  }

  await UserTasks.create(newTask);

  return { type: 201, message: 'Task created!' };
};

const deleteTask = async (id, data) => {
  const getTask = await UserTasks.destroy({ where: { user_id: id, task: data } });
  return getTask;
}

module.exports = {
  getUserTasks,
  createTask,
  deleteTask,
}
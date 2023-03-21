const { UserTasks } = require('../../database/models');

const getUserTasks = async (id) => {
  const getUser = await UserTasks.findAll({ 
    where: { user_id: id },
    attributes: { exclude: ['user_id', 'userId'] },
  });

  if (getUser.length < 1) return { type: 404, message: 'Tasks not found' };

  return { type: 200, message: getUser };
};

const checkExistTask = async (id, data) => {
  const getTask = await UserTasks.findOne({ where: { user_id: id, task: data } });
  return getTask;
};

const createTask = async (id, data) => {
  const checkTask = await checkExistTask(id, data);

  if (checkTask) return { type: 409, message: 'Task already exists!' };

  const newTask = {
    user_id: id,
    task: data,
    status: 'A fazer',
  };

  await UserTasks.create(newTask);

  return { type: 201, message: 'Task created!' };
};

const deleteTask = async (id, data) => {
  const getTask = await UserTasks.destroy({ where: { user_id: id, task: data } });
  return getTask;
};

const updateTaskStatus = async (id, data) => {
  const updatedTask = await UserTasks.update(
    { status: data.value },
    { where: { user_id: id, task: data.task } },
    );

    return updatedTask;
};

module.exports = {
  getUserTasks,
  createTask,
  deleteTask,
  updateTaskStatus,
};
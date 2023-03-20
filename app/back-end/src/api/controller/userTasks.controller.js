const service = require('../services/userTasks.service');

const getIdTask = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await service.getUserTasks(id);

  return res.status(type).json(message);
};

const create = async (req, res) => {
  const { data } = req.body;
  const { id } = req.params;
  const { type, message } = await service.createTask(id, data);

  return res.status(type).json(message);
};

const deleteTask = async (req, res) => {
  const { id, data } = req.params;
  await service.deleteTask(Number(id), data);

  return res.status(200).end();
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  console.log(data);

  await service.updateTaskStatus(Number(id), data);

  return res.status(200).end();
};

module.exports = {
  getIdTask,
  create,
  deleteTask,
  updateTask,
};
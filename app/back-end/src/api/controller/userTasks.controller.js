const service = require('../services/userTasks.service');

const getIdTask = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await service.getUserTasks(id);

  return res.status(type).json(message);
};

module.exports = {
  getIdTask,
};
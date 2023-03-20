const service = require('../services/registerTasks.service');

const create = async (req, res) => {
  const { user_id, data } = req.body;
  const { type, message } = await service.createTask(user_id, data);

  return res.status(type).json(message);
};

module.exports = {
  create,
};
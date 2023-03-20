const service = require('../services/register.service');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const { type, message } = await service.createUser(name, email, password);

  return res.status(type).json(message);
};

module.exports = {
  register,
};
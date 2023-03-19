const service = require('../services/login.service');

const login = async (req, res) => {
  const { email, password } = req.body;
  const { type, message } = await service.checkLogin(email, password);

  return res.status(type).json(message);
};

module.exports = {
  login,
};
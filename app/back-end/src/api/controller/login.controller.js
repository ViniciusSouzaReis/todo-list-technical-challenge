const service = require('../services/login.service');

const login = async (req, res) => {
  const users = await service.getUsers();

  return res.status(200).json(users);
};

module.exports = {
  login,
};
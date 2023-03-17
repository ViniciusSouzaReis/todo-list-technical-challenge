const { Users } = require('../../database/models');

const getUsers = () => Users.findAll();

module.exports = {
  getUsers,
};
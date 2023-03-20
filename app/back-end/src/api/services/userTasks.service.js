const { UserTasks } = require('../../database/models');

const getUser = (id) => UserTasks.findOne({ where: { user_id: id } });

const getUserTasks = async (id) => {
  const getUser = await UserTasks.findAll({ 
    where: { user_id: id },
    attributes: { exclude: ['user_id', 'userId'] },
  });

  if (getUser.length < 1) return {type: 404, message: 'Tasks not found'};

  return {type: 200, message: getUser};
};

module.exports = {
  getUserTasks,
}
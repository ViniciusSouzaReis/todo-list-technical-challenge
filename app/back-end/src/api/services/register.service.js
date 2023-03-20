const md5 = require('md5');
const { Users } = require('../../database/models');

const getUserEmail = (email) => Users.findOne({ where: { email } });

const createUser = async (name, email, password) => {
  const userInfo = await getUserEmail(email);

  if (userInfo) return { type: 409, message: { message: 'User already exists' } };

  const cryptPassword = md5(password);

  const newUser = {
    name,
    email,
    password: cryptPassword, 
  };

  await Users.create(newUser);

  return { type: 201, message: 'User created!' };
};

module.exports = {
  createUser,
};
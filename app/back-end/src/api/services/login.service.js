const md5 = require('md5');
const { Users } = require('../../database/models');
const tokenGenerator = require('../JWT/createJWT');

const getUserEmail = (email) => Users.findOne({ where: { email } });

const checkLogin = async (email, password) => {
  const userEmail = await getUserEmail(email);

  if (!userEmail) return { type: 404, message: 'User not found' };

  const cryptPassword = md5(password);

  if (cryptPassword === userEmail.password) {
    const { name } = userEmail;
    const data = { name };
    const token = tokenGenerator(data);
    return { type: 200, 
      message: {
        name: userEmail.name,
        email: userEmail.email,
        token,
      } };
  }

  return { type: 404, message: 'Incorrect password' };
};

module.exports = {
  checkLogin,
};
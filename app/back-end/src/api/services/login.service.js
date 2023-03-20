const md5 = require('md5');
const { Users } = require('../../database/models');
const tokenGenerator = require('../JWT/createJWT');

const getUserEmail = (email) => Users.findOne({ where: { email } });

const checkLogin = async (email, password) => {
  const userInfo = await getUserEmail(email);

  if (!userInfo) return { type: 404, message: 'User not found' };

  const cryptPassword = md5(password);

  if (cryptPassword === userInfo.password) {
    const { name } = userInfo;
    const data = { name };
    const token = tokenGenerator(data);
    return { type: 200, 
      message: {
        id: userInfo.id,
        name: userInfo.name,
        email: userInfo.email,
        token,
      } };
  }

  return { type: 404, message: 'Incorrect password' };
};

module.exports = {
  checkLogin,
};
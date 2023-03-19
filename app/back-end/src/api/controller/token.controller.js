const jwtVerify = require('../JWT/validateJWT');

const checkToken = async (req, res) => {
  const { authorization } = req.headers;
  const { type } = jwtVerify(authorization);

  return res.status(type).end();
};

module.exports = {
  checkToken,
};
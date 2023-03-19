const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const jwtKeyPath = path.resolve(__dirname, '../../../jwt.evaluation.key');
const secret = fs.readFileSync(jwtKeyPath, 'utf8');

const jwtVerify = (token) => {
  if (!token) {
    return { type: 404, message: 'Token not found' };
  }

  try {
    const decoded = jwt.verify(token, secret);
    return { type: 200, message: decoded };
  } catch (error) {
    return { type: 401, message: 'Invalid token' };
  }
};

module.exports = jwtVerify;
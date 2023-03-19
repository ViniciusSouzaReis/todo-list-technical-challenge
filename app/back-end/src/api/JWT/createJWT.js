const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const jwtKeyPath = path.resolve(__dirname, '../../../jwt.evaluation.key');
const secret = fs.readFileSync(jwtKeyPath, 'utf8');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const tokenGenerator = (data) => {
  const token = jwt.sign(data, secret, jwtConfig);
  return token;
};

module.exports = tokenGenerator;
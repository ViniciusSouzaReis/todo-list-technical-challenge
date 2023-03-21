const express = require('express');
const validateJWT = require('../JWT/validateJWT');

const route = express.Router();

const { checkToken } = require('../controller/token.controller');

route.post('/token', validateJWT, checkToken);

module.exports = route;
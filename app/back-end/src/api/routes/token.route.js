const express = require('express');

const route = express.Router();

const { checkToken } = require('../controller/token.controller');

route.post('/token', checkToken);

module.exports = route;
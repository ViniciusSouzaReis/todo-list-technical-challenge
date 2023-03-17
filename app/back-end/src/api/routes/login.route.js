const express = require('express');

const route = express.Router();

const { login } = require('../controller/login.controller');

route.get('/users', login);

module.exports = route;
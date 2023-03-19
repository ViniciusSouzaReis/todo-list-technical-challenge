const express = require('express');

const route = express.Router();

const { login } = require('../controller/login.controller');

route.post('/login', login);

module.exports = route;
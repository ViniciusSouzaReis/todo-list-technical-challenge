const express = require('express');

const route = express.Router();

const { register } = require('../controller/register.controller');

route.post('/register', register);

module.exports = route;
const express = require('express');

const route = express.Router();

const { getIdTask, create } = require('../controller/userTasks.controller');

route.get('/tasks/:id', getIdTask);
route.post('/register/:id', create);

module.exports = route;
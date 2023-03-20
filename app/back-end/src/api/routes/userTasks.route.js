const express = require('express');

const route = express.Router();

const { getIdTask } = require('../controller/userTasks.controller');
const { create } = require('../controller/registerTasks.controller');

route.get('/tasks/:id', getIdTask);
route.post('/register/:id', create);

module.exports = route;
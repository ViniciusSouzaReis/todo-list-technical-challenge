const express = require('express');

const route = express.Router();

const { getIdTask, create, deleteTask } = require('../controller/userTasks.controller');

route.get('/tasks/:id', getIdTask);
route.post('/register/:id', create);
route.delete('/delete/:id/:data', deleteTask);

module.exports = route;
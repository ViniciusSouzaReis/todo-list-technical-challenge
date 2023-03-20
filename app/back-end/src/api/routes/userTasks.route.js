const express = require('express');

const route = express.Router();

const { getIdTask, create, deleteTask, updateTask } = require('../controller/userTasks.controller');

route.get('/tasks/:id', getIdTask);
route.post('/register/:id', create);
route.delete('/delete/:id/:data', deleteTask);
route.patch('/update/:id', updateTask);

module.exports = route;
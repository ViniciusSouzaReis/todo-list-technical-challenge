const express = require('express');
const validateJWT = require('../JWT/validateJWT');

const route = express.Router();

const { getIdTask, create, deleteTask, updateTask } = require('../controller/userTasks.controller');

route.get('/tasks/:id', validateJWT, getIdTask);
route.post('/register/:id', validateJWT, create);
route.delete('/delete/:id/:data', validateJWT, deleteTask);
route.patch('/update/:id', validateJWT, updateTask);

module.exports = route;
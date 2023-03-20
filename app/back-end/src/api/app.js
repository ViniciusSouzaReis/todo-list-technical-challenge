const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const loginRoute = require('./routes/login.route');
const tokenRoute = require('./routes/token.route');
const registerRoute = require('./routes/register.route');

app.get('/', (_req, res) => res.status(418).end());
app.use(loginRoute);
app.use(tokenRoute);
app.use(registerRoute);

module.exports = app;
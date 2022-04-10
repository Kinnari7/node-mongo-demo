const express = require('express');

const moduleRoute = express.Router();

moduleRoute.use('/user', require('./users/userRoutes'));

module.exports = moduleRoute;

const express = require('express');

const moduleRoute = express.Router();

moduleRoute.use('/user', require('./users/userRoutes'));
moduleRoute.use('/country', require('./country/countryRoutes'));
moduleRoute.use('/challenge', require('./challenges/challengeRoutes'));

module.exports = moduleRoute;

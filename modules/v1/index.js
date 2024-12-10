const express = require('express');

const moduleRoute = express.Router();

moduleRoute.use('/user', require('./users/userRoutes'));
moduleRoute.use('/country', require('./country/countryRoutes'));
moduleRoute.use('/challenge', require('./challenges/challengeRoutes'));
moduleRoute.use('/community', require('./community/communityRoutes'));
moduleRoute.use('/product', require('./product/productRoutes'));

module.exports = moduleRoute;

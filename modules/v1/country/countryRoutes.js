const express = require('express');
const countryRoutes = express.Router();
const countryController = require('./countryController');

// get country list
const getCountryListMiddleware = [
    countryController.getCountryList
];
countryRoutes.get('/get-all-countries', getCountryListMiddleware);

module.exports = countryRoutes;    
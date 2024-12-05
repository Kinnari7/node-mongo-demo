const express = require('express');
const countryRoutes = express.Router();
const countryController = require('./countryController');

// add country
const addCountryMiddleware = [
    countryController.addCountry
];
countryRoutes.post('/admin/add-country', addCountryMiddleware);

// edit country
const editCountryMiddleware = [
    countryController.editCountry
];
countryRoutes.post('/admin/edit-country', editCountryMiddleware);

// get country
const getCountryMiddleware = [
    countryController.getCountry
];
countryRoutes.post('/admin/get-country', getCountryMiddleware);

// get country list
const getCountryListMiddleware = [
    countryController.getCountryList
];
countryRoutes.get('/get-all-countries', getCountryListMiddleware);

// update country name for user
const updateCountryStatusMiddleware = [
    countryController.updateCountryStatus
];
countryRoutes.put('/status/updateStatusOfCountry', updateCountryStatusMiddleware);

module.exports = countryRoutes;    
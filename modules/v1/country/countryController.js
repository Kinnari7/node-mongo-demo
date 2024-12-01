const contryController = {};
const { size } = require('lodash');
const countryService = require('./countryService');

contryController.getCountryList = async (req, res) => {
    try {
        let response = await countryService.getCountryList();
        response.forEach((country) => {
            country._id = country.index;
        });
        console.log('/////', response);
        res.send({
            message: 'Success',
            data: { categories: response },
            status: 200,
            success: true
        });
    } catch (e) {
        return res.send({
            message: 'Error',
            data: e,
            status: 500,
            success: false
        });
    }
};

contryController.updateCountryStatus = async (req, res) => {
    try {
        let response = await countryService.updateCountryStatus(req.body);
        if (size(response) > 0) {
            res.send({
                message: 'Country updated successfully',
                data: {
                    ...response, challenges: [],
                },
                status: 200,
                success: true
            });
        }
        else {
            return res.send({
                message: 'User does not exist.',
                data: e,
                status: 404,
                success: true
            });
        }
    } catch (e) {
        return res.send({
            message: 'Error',
            data: e,
            status: 500,
            success: false
        });
    }
};

module.exports = contryController;
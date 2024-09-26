const contryController = {};
const countryService = require('./countryService');

contryController.getCountryList = async (req, res) => {
    try {
        let response = await countryService.getCountryList();
        res.send({
            msg: 'Success',
            data: response
        })
    } catch (e) {
        return res.send({
            msg: 'Error',
            data: e
        })
    }
};

module.exports = contryController;
const countryService = {};
const Modals = require("../../../models");

countryService.getCountryList = () => {
    return Modals.Countries.find();
};

module.exports = countryService;

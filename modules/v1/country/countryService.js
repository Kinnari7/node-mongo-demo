const countryService = {};
const Modals = require("../../../models");

countryService.getCountryList = () => {
    return Modals.Countries.find();
};

countryService.updateCountryStatus = (data) => {
    if (data?.userId) {
        return Modals.Users.findOneAndUpdate({ _id: data.userId }, {
            countryId: data.countryId
        }, { new: true, lean: true }).lean();
    }
    else {
        return Modals.Users.findOneAndUpdate({ deviceId: data.deviceId }, {
            countryId: data.countryId
        }, { new: true, lean: true }).lean();
    }
};

module.exports = countryService;

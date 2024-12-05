const countryService = {};
const Modals = require("../../../models");
const { ObjectId } = require('mongodb');

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

countryService.addCountry = (data) => {
    return Modals.Countries.create({
        ...data,
        status: true,
        count: 1
    });
}

countryService.editCountry = (data) => {
    return Modals.Countries.findOneAndUpdate({
        _id: ObjectId(data._id)
    }, {
        title: data.title,
        image: data.image
    }, {new: true, lean: true }).lean();
}

module.exports = countryService;

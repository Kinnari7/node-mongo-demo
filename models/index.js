const Users = require('./userModel');
const ColorGradients = require('./colorGradientModel');
const Countries = require('./countryModel');
const GuestUsers = require('./guestUserModel');
const Hikes = require('./hikeModel');
const UserLocations = require('./userLocationModel');
const UserPreferences = require('./userPreferenceModel');

const MongoModals = {
    Users,
    ColorGradients,
    Countries,
    GuestUsers,
    Hikes,
    UserLocations,
    UserPreferences
};

module.exports = MongoModals;
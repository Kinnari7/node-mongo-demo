const Users = require('./userModel');
const ColorGradients = require('./colorGradientModel');
const Countries = require('./countryModel');
const GuestUsers = require('./guestUserModel');
const Hikes = require('./hikeModel');
const UserLocations = require('./userLocationModel');
const UserPreferences = require('./userPreferenceModel');
const UserHike = require('./userHikeModel');

const MongoModals = {
    Users,
    ColorGradients,
    Countries,
    GuestUsers,
    Hikes,
    UserLocations,
    UserPreferences,
    UserHike
};

module.exports = MongoModals;
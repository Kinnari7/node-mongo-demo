const Users = require('./userModel');
const Products = require('./productModel');
const ColorGradients = require('./colorGradientModel');
const Countries = require('./countryModel');
const GuestUsers = require('./guestUserModel');
const Hikes = require('./hikeModel');
const UserLocations = require('./userLocationModel');
const UserPreferences = require('./userPreferenceModel');

const MongoModals = {
    Users,
    Products,
    ColorGradients,
    Countries,
    GuestUsers,
    Hikes,
    UserLocations,
    UserPreferences
}

module.exports = MongoModals;
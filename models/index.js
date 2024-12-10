const Users = require('./userModel');
const Countries = require('./countryModel');
const GuestUsers = require('./guestUserModel');
const Hikes = require('./hikeModel');
const UserPreferences = require('./userPreferenceModel');
const UserHike = require('./userHikeModel');
const Community = require('./communityModel');
const Product = require('./productModel');

const MongoModals = {
    Users,
    Countries,
    GuestUsers,
    Hikes,
    UserPreferences,
    UserHike,
    Community,
    Product
};

module.exports = MongoModals;
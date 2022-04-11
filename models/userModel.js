var mongoose = require('mongoose');
// Setup schema
var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: String,
    phone: String,

}, {
    timestamps: true
});
// Export Contact model
const Users = mongoose.model('Users', userSchema);
module.exports = Users;
module.exports.get = function (callback, limit) {
    Users.find(callback).limit(limit);
};
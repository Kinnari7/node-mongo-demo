const userService = {};
const Modals = require('../../../models')

userService.getUsersList = () => {
    return Modals.Users.find();
}

userService.addUsersList = (data) => {
    return Modals.Users.create(data);
}

userService.editUsersList = (id, data) => {
    return Modals.Users.updateOne({ _id: id }, data);
}

userService.deleteUsersList = (id, data) => {
    return Modals.Users.deleteOne({ _id: id });
}

module.exports = userService;
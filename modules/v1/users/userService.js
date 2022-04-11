const userService = {};
const Modals = require('../../../models')

userService.getUsersList = () => {
    let query = {
        age: { $gt: 20 }
    }
    return Modals.Users.find(query, { name: 1, _id: 0 });
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
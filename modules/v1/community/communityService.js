const communityService = {};
const Modals = require("../../../models");
const { ObjectId } = require('mongodb');

communityService.createPost = async (req) => {
    return await Modals.Community.create(req);
};

communityService.deletePost = async (id) => {
    return await Modals.Community.deleteOne({
        _id: ObjectId(id)
    });
};

communityService.getAllPost = async (data) => {
    return await Modals.Community.find();
};

module.exports = communityService;
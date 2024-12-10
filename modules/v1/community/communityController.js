const communityController = {};
const communityService = require('./communityService');
const { size } = require('lodash');

communityController.createPost = async (req, res) => {
    try {
        let response = await communityService.createPost(req.body);
        console.log('response',response)
        if (size(response) > 0) {
            await res.send({
                message : 'Post added successfully',
                data: response,
                success: true,
                status: 200
            });
        }
    } catch (e) {
        return res.send({
            message: 'Error',
            data: e,
            success: false,
            status: 200
        });
    }
};

communityController.deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        let response = await communityService.deletePost(id);
        if (size(response) > 0) {
            await res.send({
                message : 'Post deleted successfully',
                data: response,
                success: true,
                status: 200
            });
        }
    } catch (e) {
        return res.send({
            message: 'Error',
            data: e,
            success: false,
            status: 200
        });
    }
};

communityController.getAllPost = async (req, res) => {
    try {
        let response = await communityService.getAllPost(req.body);
        if (size(response) > 0) {
            await res.send({
                message : 'All Community',
                data: {
                    communityList: response,
                    totalCount: 2
                },
                success: true,
                status: 200
            });
        }
    } catch (e) {
        return res.send({
            message: 'Error',
            data: e,
            success: false,
            status: 200
        });
    }
};

module.exports = communityController;
const productService = {};
const Modals = require("../../../models");
const { ObjectId } = require('mongodb');

productService.createProduct = async (req) => {
    return await Modals.Product.create(req);
};

productService.deleteProduct = async (id) => {
    return await Modals.Product.deleteOne({
        _id: ObjectId(id)
    });
};

productService.getAllProducts = async () => {
    return await Modals.Product.find();
};

productService.orderList = async () => {
    return await Modals.Product.aggregate([
        {
            $match: {
                userId: { $exists: true, $ne: null },
                address: { $exists: true, $ne: null }
            }
        },
        {
            $lookup: {
                from: "users", // The collection name for the Users model
                localField: "userId", // The field in the Product schema
                foreignField: "_id", // The field in the Users schema
                as: "userDetails"
            }
        },
        {
            $unwind: "$userDetails"
        },
        {
            $project: {
                _id: 1,
                title: 1,
                aboutTheProduct: 1,
                price: 1,
                quantity: 1,
                img: 1,
                address: 1,
                id: 1,
                updatedAt: 1,
                userId: 1,
                username: "$userDetails.name",
                email: "$userDetails.email"
            }
        }
    ]);
}

productService.handlePayment = async (data) => {
    return await Modals.Product.findOneAndUpdate(
        { _id: ObjectId(data.id)}, 
        { $set: { 
            userId: ObjectId(data.userId),
            address: data.address
        } }, 
        { new: true, lean: true }
      ).lean();
};


module.exports = productService;
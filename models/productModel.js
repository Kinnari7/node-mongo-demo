const mongoose = require("mongoose");
const AutoIncrement = require('./autoIncrementModel');

const productSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: false,
        },
        title: {
            type: String,
            default: null,
            required: false
        },
        aboutTheProduct: {
            type: String,
            default: null,
            required: false
        },
        price: {
            type: Number,
            default: 0,
            required: false
        },
        quantity: {
            type: Number,
            default: 0,
            required: false
        },
        categoryId: {
            type: Number,
            default: 2,
            required: false
        },
        categoryIndex: {
            type: Number,
            default: 1,
            required: false
        },
        categoryName: {
            type: String,
            default: "Featured",
            required: false
        },
        categoryStatus: {
            type: Number,
            default: 1,
            required: false
        },
        desc: {
            type: String,
            default: null,
            required: false
        },
        img: {
            type: [String],
            default: [],
            required: false
        },
        address: {
            type: String,
            default: null,
            required: false
        },
        id: { type: Number, unique: true },
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    }
);

productSchema.plugin(AutoIncrement, { modelName: 'Product', field: 'id' });
const Product = mongoose.model.Product || mongoose.model("Product", productSchema);
module.exports = Product;

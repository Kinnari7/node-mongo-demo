var mongoose = require("mongoose");
const AutoIncrement = require('./autoIncrementModel');
// Setup schema
var hikeSchema = new mongoose.Schema(
    {
        distance: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        withRedemption: {
            type: Boolean,
            required: true,
        },
        isHide: {
            type: Boolean,
            required: true
        },
        id: { type: Number, unique: true },
        countryId: {
            type: Number,
            required: true
        }

    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
        // _id: false
    }
);

hikeSchema.plugin(AutoIncrement, { modelName: 'Hikes', field: 'id' });
const Hikes = mongoose.model.Hikes || mongoose.model("Hikes", hikeSchema);
module.exports = Hikes;


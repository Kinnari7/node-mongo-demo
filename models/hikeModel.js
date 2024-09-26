var mongoose = require("mongoose");
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
        }
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    }
);

const Hikes = mongoose.model("Hikes", hikeSchema);
module.exports = Hikes;


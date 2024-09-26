var mongoose = require("mongoose");
// Setup schema
var countrySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        count: {
            type: Number,
            required: true,
        },
        status: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        index: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    }
);

const Countries = mongoose.model("Countries", countrySchema);
module.exports = Countries;


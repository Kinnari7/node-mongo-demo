var mongoose = require("mongoose");
// const AutoIncrement = require('./autoIncrementModel');
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
            type: Boolean,
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
        // _id: false
    }
);

// countrySchema.plugin(AutoIncrement, { field: 'id' });
const Countries = mongoose.model.Countries || mongoose.model("Countries", countrySchema);
module.exports = Countries;


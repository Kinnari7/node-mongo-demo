var mongoose = require("mongoose");
const AutoIncrement = require('./autoIncrementModel');
const AutoIncrementIndex = require("mongoose-sequence")(mongoose);

// Setup schema
var countrySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        count: {
            type: Number,
            required: false,
            default: 1
        },
        status: {
            type: Boolean,
            required: false,
            default: true
        },
        image: {
            type: String,
            required: true,
        },
        index: {
            type: Number,
        },
        deletedAt: {
            type: Date,
            default: null
        },
        id: { type: Number, unique: true },
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
        // _id: false
    }
);

countrySchema.plugin(AutoIncrementIndex, { inc_field: "index" });

countrySchema.plugin(AutoIncrement, {modelName: 'Countries', field: 'id' });
const Countries = mongoose.model.Countries || mongoose.model("Countries", countrySchema);
module.exports = Countries;


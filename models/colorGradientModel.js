var mongoose = require("mongoose");
const AutoIncrement = require('./autoIncrementModel');
// Setup schema
var colorGradientSchema = new mongoose.Schema(
    {
        hike_id: {
            type: Number,
            ref: "Hikes",
            required: true,
        },
        color: {
            type: [String],
            required: false,
            default: []
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

colorGradientSchema.plugin(AutoIncrement, { modelName: 'ColorGradients', field: 'id' });
const ColorGradients = mongoose.model.ColorGradients || mongoose.model("ColorGradients", colorGradientSchema);
module.exports = ColorGradients;


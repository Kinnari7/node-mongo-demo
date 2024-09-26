var mongoose = require("mongoose");
// Setup schema
var colorGradientSchema = new mongoose.Schema(
    {
        hike_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hikes",
            required: true,
        },
        color: {
            type: String,
            required: false,
            color: "red"
        }
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    }
);

const ColorGradients = mongoose.model("ColorGradients", colorGradientSchema);
module.exports = ColorGradients;


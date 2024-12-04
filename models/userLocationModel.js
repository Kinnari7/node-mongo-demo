var mongoose = require("mongoose");
const AutoIncrement = require('./autoIncrementModel');
// Setup schema
var userLocationSchema = new mongoose.Schema(
    {
        user_id: {
            type: Number,
            ref: "Users",
            required: true,
        },
        latitude: {
            type: String,
            required: true,
        },
        longitude: {
            type: String,
            required: true,
        },
        id: { type: Number, unique: true },
        deletedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
        // _id: false
    }
);

userLocationSchema.plugin(AutoIncrement, { modelName: 'UserLocations', field: 'id' });
const UserLocations = mongoose.model.UserLocations || mongoose.model("UserLocations", userLocationSchema);
module.exports = UserLocations;


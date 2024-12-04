var mongoose = require("mongoose");
const AutoIncrement = require('./autoIncrementModel');
// Setup schema
var guestUserSchema = new mongoose.Schema(
    {
        deviceId: {
            type: String,
            required: true,
        },
        deviceToken: {
            type: String,
            required: true,
        },
        deviceType: {
            type: Number,
            required: true,
        },
        lastLoginDate: {
            type: Date,
            required: false,
        },
        countryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Countries",
            required: false,
        },
        cartCount: {
            type: Number,
            required: false,
            default: 0
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

guestUserSchema.plugin(AutoIncrement, { modelName: 'GuestUsers', field: 'id' });
const GuestUsers = mongoose.model.GuestUsers || mongoose.model("GuestUsers", guestUserSchema);
module.exports = GuestUsers;


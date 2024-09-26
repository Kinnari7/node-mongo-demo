var mongoose = require("mongoose");
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
            required: true,
        },
        cartCount: {
            type: Number,
            required: false,
            default: 0
        }
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    }
);

const GuestUsers = mongoose.model("GuestUsers", guestUserSchema);
module.exports = GuestUsers;


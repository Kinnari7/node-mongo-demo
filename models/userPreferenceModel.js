var mongoose = require("mongoose");
// Setup schema
var userPreferencesSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true,
        },
        inAppNotification: {
            type: Boolean,
            required: false,
            default: false,
        },
        notificationToMyPost: {
            type: Boolean,
            required: false,
            default: false,
        },
        optOutCommunication: {
            type: Boolean,
            required: false,
            default: false,
        },
        language: {
            type: String,
            required: false,
            default: "English"
        }
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    }
);

const UserPreferences = mongoose.model("UserPreferences", userPreferencesSchema);
module.exports = UserPreferences;


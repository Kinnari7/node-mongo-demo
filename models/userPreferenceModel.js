var mongoose = require("mongoose");
const AutoIncrement = require('./autoIncrementModel');
// Setup schema
var userPreferencesSchema = new mongoose.Schema(
    {
        user_id: {
            type: Number,
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
        },
        id: { type: Number, unique: true },
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
        // _id: false
    }
);

userPreferencesSchema.plugin(AutoIncrement, { modelName: 'UserPreferences', field: 'id' });
const UserPreferences = mongoose.model.UserPreferences || mongoose.model("UserPreferences", userPreferencesSchema);
module.exports = UserPreferences;


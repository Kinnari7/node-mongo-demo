const mongoose = require("mongoose");
const AutoIncrement = require('./autoIncrementModel');

const communitySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true,
        },
        content: {
            type: String,
            default: null,
            required: false
        },
        img: {
            type: [String],
            default: [],
            required: false
        },
        postType: {
            type: Number,
            default: 2,
            required: false
        },
        totalComment: {
            type: Number,
            default: 0,
            required: false
        },
        totalLikes: {
            type: Number,
            default: 0,
            required: false
        },
        trailName: {
            type: String,
            default: null,
            required: false
        },
        id: { type: Number, unique: true },
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    }
);

communitySchema.plugin(AutoIncrement, { modelName: 'Community', field: 'id' });
const Community = mongoose.model.Community || mongoose.model("Community", communitySchema);
module.exports = Community;

var mongoose = require("mongoose");
const AutoIncrement = require('./autoIncrementModel');
// Setup schema
var hikeSchema = new mongoose.Schema(
    {
        distance: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        withRedemption: {
            type: Boolean,
            required: true,
        },
        isHide: {
            type: Boolean,
            required: true
        },
        id: { type: Number, unique: true },
        countryId: {
            type: Number,
            required: true
        },
        difficulty: {
            type: Number,
            default: 5,
            required: false
        },
        elevation: {
            type: Number,
            default: 1,
            required: false
        },
        howItWorks: {
            type: String,
            required: false
        },
        route: {
            type: {
                coordinates: {
                    type: [
                        {
                            latitute: {
                                type: Number,
                                require: false,
                            },
                            longitude: {
                                type: Number,
                                require: false
                            }
                        }
                    ]
                }
            },
            default: []
        },
        adminMapImage: {
            type: String,
            default: null,
            required: false
        },
        challengeType: {
            type: String,
            default: "Day Hike",
            required: false
        },
        howItWorksLink: {
            type: String,
            default: null,
            required: false
        },
        multipartRoute: {
            type: [String],
            default: [],
            required: false,
        },
        asSubChallenge: {
            type: Boolean,
            default: false,
            required: false
        },
        subChallenge: {
            type: [String],
            default: [],
            required: false
        },
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

hikeSchema.plugin(AutoIncrement, { modelName: 'Hikes', field: 'id' });
const Hikes = mongoose.model.Hikes || mongoose.model("Hikes", hikeSchema);
module.exports = Hikes;


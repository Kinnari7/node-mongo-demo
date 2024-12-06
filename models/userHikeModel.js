const mongoose = require("mongoose");
const AutoIncrement = require('./autoIncrementModel');

const userHikeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: false,
    },
    hikeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hikes",
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      default: null,
      required: false
    },
    currentDistance: {
      type: Number,
      default: 0,
    },
    completionPercentage: {
      type: Number,
      default: 0,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    isSponsored: {
      type: Boolean,
      default: false,
    },
    isAlternateTracking: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: null,
    },
    rank: {
      type: Number,
      default: null,
    },
    isMedalRedeemed: {
      type: Boolean,
      default: false,
      required: false
    },
    completionDate: {
      type: Date,
      required: false,
    },
    deletedAt: {
      type: Date,
      default: null
    },
    id: { type: Number, unique: true },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

userHikeSchema.plugin(AutoIncrement, { modelName: 'UserHike', field: 'id' });
const UserHike = mongoose.model.UserHike || mongoose.model("UserHike", userHikeSchema);
module.exports = UserHike;

const mongoose = require("mongoose");
const AutoIncrement = require('./autoIncrementModel');

const userHikeSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      ref: "Users",
      required: true,
    },
    hikeId: {
      type: Number,
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
      required: true,
    }
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

userHikeSchema.plugin(AutoIncrement, { modelName: 'UserHike', field: 'id' });
const UserHike = mongoose.model.UserHike || mongoose.model("UserHike", userHikeSchema);
module.exports = UserHike;

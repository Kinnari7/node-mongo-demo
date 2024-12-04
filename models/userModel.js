var mongoose = require("mongoose");
const AutoIncrement = require('./autoIncrementModel');

// Setup schema
var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
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
    countryId: {
      type: Number,
      ref: "Countries",
      required: false,
    },
    photo: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    isAdmin: {
      type: Boolean,
      required: false,
      default: false,
    },
    status: {
      type: String,
      required: false,
    },
    isVerified: {
      type: Boolean,
      required: false,
      default: false
    },
    verificationToken: {
      type: String,
      required: false
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

userSchema.plugin(AutoIncrement, { modelName: 'Users', field: 'id' });
const Users = mongoose.model.Users || mongoose.model("Users", userSchema);
userSchema.index({ email: 1 });
module.exports = Users;


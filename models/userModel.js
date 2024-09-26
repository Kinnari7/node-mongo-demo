var mongoose = require("mongoose");
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Countries",
      required: true,
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
    }
    // products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Products" }],
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

const Users = mongoose.model("Users", userSchema);
userSchema.index({ email: 1 });
module.exports = Users;


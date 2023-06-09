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
    age: Number,
    password: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Products" }],
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("Users", userSchema);
userSchema.index({ email: 1 });
module.exports = Users;


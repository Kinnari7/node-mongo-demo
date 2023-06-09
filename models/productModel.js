var mongoose = require("mongoose");
// Setup schema
var productSchema = new mongoose.Schema(
  {
    product: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    colour: String,
    available: {
      type: String,
      required: true,
    },
    size: {
      height: { type: Number, required: true },
      unit: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

const Products = mongoose.model("Products", productSchema);
module.exports = Products;


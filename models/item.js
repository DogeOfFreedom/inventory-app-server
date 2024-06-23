const mongoose = require("mongoose");

const item = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantityInStock: {
    type: Number,
    required: true,
  },
  imgURL: {
    type: String,
  },
});

module.exports = mongoose.model("Items", item);

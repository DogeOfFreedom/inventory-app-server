const mongoose = require("mongoose");

const category = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  items: {
    type: [String],
    default: () => [],
  },
});

module.exports = mongoose.model("Categories", category);

const mongoose = require("mongoose");

const category = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    items: {
        type: [mongoose.ObjectId],
        default: () => [],
    }
})

module.exports = mongoose.model("Categories", category);
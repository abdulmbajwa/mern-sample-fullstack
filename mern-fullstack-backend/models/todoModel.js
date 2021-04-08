const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    text: String,
    createDate: Date,
    status: String,
})
module.exports = mongoose.model("todos", todoSchema);
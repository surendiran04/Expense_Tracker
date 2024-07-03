const mongoose = require("mongoose");

const ModelSchema = new mongoose.Schema({
  Expense_name: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
  Amount: {
    type: Number,
    required: true,
  },
  Date:{
    type:Date,
    required: true,
  },
  createdAt: { type: Date, required:false },
  updatedAt: { type: Date, required:false },
  // createdAt: { type: Date, default: Date.now },
  // updatedAt: { type: Date, default: Date.now },
});

const Model = mongoose.model("Expense", ModelSchema);

module.exports = Model;
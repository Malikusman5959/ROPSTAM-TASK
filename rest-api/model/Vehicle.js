const mongoose = require("mongoose");

const Vehicle = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  model: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  regNo: {
    type: String,
    required: true,
  }
});
module.exports = mongoose.model("Vehicle", Vehicle);

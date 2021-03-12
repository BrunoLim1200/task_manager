const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
  title: {
    type: "string",
    required: true,
    minlength: 1,
    trim: true,
  },
});

module.exports = mongoose.model("List", ListSchema);

const mongoose = require("mongoose");
const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  description: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
module.exports = mongoose.model("Book", BookSchema);

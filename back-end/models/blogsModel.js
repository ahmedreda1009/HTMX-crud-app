const mongoose = require("mongoose");

const schema = mongoose.Schema({
  title: String,
  content: String,
  image: String,
});

const BlogModel = mongoose.model("Blog", schema);

module.exports = BlogModel;

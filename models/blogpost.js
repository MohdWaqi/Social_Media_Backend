const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String},
  body: { type: String},
  device: { type: String, enum: ['PC', 'TABLET', 'MOBILE']},
  user: { type: String, required: true },
});

module.exports = mongoose.model('Post', postSchema);

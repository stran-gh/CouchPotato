const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  type: { type: String, require: true }
});

module.exports = mongoose.model('Movie', movieSchema);

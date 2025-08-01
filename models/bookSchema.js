const mongoose = require('mongoose');

const bookSchema = mongoose.Schema ({
  title: {
    type: String,
    required:true
  },
  author: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Books', bookSchema);
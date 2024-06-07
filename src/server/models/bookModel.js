const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TO-DO add last updated date 

const bookSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  cover_i: {
    type: Number,
  },
  notes: {
    type: String,
    default: ''
  }
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;

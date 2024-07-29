const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    default: '',
  },
  added: {
    type: Date,
    default: Date.now(),
  },
  updated: {
    type: Date,
    default: Date.now(),
  },
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;

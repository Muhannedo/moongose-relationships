// models/book.js
const mongoose = require('mongoose');

// Define the User schema
const bookSchema = new mongoose.Schema({
  name: String,
  author: String,
  isItPublished: Boolean,
  sells: Number,
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
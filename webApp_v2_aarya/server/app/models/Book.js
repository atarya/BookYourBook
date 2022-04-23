const mongoose = require('mongoose');

const book = mongoose.Schema({});

const Book = mongoose.model("Book", book);

module.exports = Book;
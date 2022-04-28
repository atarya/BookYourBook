const express = require('express');
const formidable = require('express-formidable');
const router = express.Router();


// middlewares
const { requireSignin, bookOwner } = require('../middlewares');

const { create, books, image, sellerBooks, remove, read } = require('../controllers/book.controller');



router.post('/create-book', requireSignin, formidable(), create);
router.get("/books", books);
router.get("/book/image/:bookId", image);
router.get('/seller-books', requireSignin, sellerBooks);
router.delete('/delete-book/:bookId', requireSignin, bookOwner, remove);
router.get("/book/:bookId", read);

module.exports = router;
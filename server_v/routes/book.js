const express = require('express');
const formidable = require('express-formidable');
const router = express.Router();


// middlewares
const { requireSignin } = require('../middlewares');

const { create } = require('../controllers/book.controller');


router.post('/create-book', requireSignin, formidable(), create);

module.exports = router;
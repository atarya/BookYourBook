const { addBook, removeBook, searchBook, getBook, updateBook } = require("../controllers/bookControllers")
const { protect } = require('../middlewares/auth');
const express = require("express");
const router = express.Router();

// add new book
router.route("/").post(protect, addBook);
// delete any book
router.route("/").delete(protect, removeBook);
// search books
router.route("/").get(protect, searchBook);
// individual book
router.route("/:id").get(protect, getBook);
// update any book (availability and review)
router.route("/:id").put(protect, updateBook);

module.exports = router;
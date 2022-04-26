const express = require("express");
const router = express.Router();
const passport = require('passport');
require("../middlewares/auth")
const secure = passport.authenticate('jwt', { session: false })
const { exclusive } = require("../middlewares/membership_check")
const { getPopular, getSearch, getSingle, updateSingle, deleteSingle, addSingle, userList } = require("../controllers/bookController");

// {{URL}}/book/
// minus books of logged in user and filter? true:false this would filter only the available books 
router.route("/popular").get(secure, exclusive, getPopular)
// search by title, author, genre, check for 3 req.query; (query = search query, user = user._id and filter = true/false this would filter only the available books) minus books of logged in user
router.route("/search").get(secure, exclusive, getSearch) // Done
// get my books
router.route("/user_list").get(secure, exclusive, userList) // Done
// get single book by id
router.route("/single/:book_id").get(secure, exclusive, getSingle) // Done
// update book by id
router.route("/update/:book_id").put(secure, exclusive, updateSingle) // Done
// delete book by id
router.route("/delete/:book_id").delete(secure, exclusive, deleteSingle)// Done
// add book
router.route("/add").post(secure, exclusive, addSingle) // Done

module.exports = router;
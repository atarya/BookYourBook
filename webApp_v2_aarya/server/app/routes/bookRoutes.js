const express = require("express");
const router = express.Router();
const passport = require('passport');
require("../middlewares/auth")
const secure = passport.authenticate('jwt', { session: false })
const { getPopular, getSearch, getSingle, updateSingle, deleteSingle, addSingle } = require("../controllers/bookController");

// {{URL}}/book/
// minus books of logged in user and filter? true:false this would filter only the available books 
router.route("/popular").get(secure, getPopular)
// search by title, author, genre, check for 3 req.query; (query = search query, user = user._id and filter = true/false this would filter only the available books) minus books of logged in user
router.route("/search").get(secure, getSearch)
// get single book by id
router.route("/single/:id").get(secure, getSingle)
// update book by id
router.route("/update/:id").put(secure, updateSingle)
// delete book by id
router.route("/delete/:id").delete(secure, deleteSingle)
// add book
router.route("/add").post(secure, addSingle)

module.exports = router;
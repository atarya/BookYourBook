const express = require("express");
const router = express.Router();
const passport = require('passport');
require("../middlewares/auth")
const secure = passport.authenticate('jwt', { session: false })
const { exclusive } = require("../middlewares/membership_check")
const { initialize, updateExchange, getLent, getBorrowed } = require("../controllers/exchangeController");

// {{URL}}/exchange
router.route("/initialize/:book_id").post(secure, exclusive, initialize);
router.route("/update/:book_id").put(secure, exclusive, updateExchange);
router.route("/get_lent").get(secure, exclusive, getLent);
router.route("/get_borrowed").get(secure, exclusive, getBorrowed);

module.exports = router;
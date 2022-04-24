const express = require("express");
const router = express.Router();
const passport = require('passport');
require("../middlewares/auth")
const secure = passport.authenticate('jwt', { session: false })
const { initialize, update, get_all } = require("../controllers/exchangeController");

// {{URL}}/exchange

router.route("/initialize").post(secure, initialize);
router.route("/update").put(secure, update);
router.route("/get_all").get(secure, get_all);

module.exports = router;
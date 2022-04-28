const express = require("express")
const router = express.Router()
const passport = require('passport');
require("../middlewares/auth")
const secure = passport.authenticate('jwt', { session: false })
const { createOrder, paymentCallback } = require("../controllers/paymentController")

// {{URL}}/payment
router.route("/createOrder").get(secure, createOrder)
router.route("/callback").post(secure, paymentCallback)

module.exports = router;
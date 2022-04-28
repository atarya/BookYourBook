const express = require("express")
const router = express.Router()
const secure = passport.authenticate('jwt', { session: false })
const { createOrder } = require("../controllers/paymentController")

router.route("/createOrder").get(secure, createOrder)

module.exports = router;
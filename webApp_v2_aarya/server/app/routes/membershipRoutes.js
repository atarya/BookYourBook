const express = require("express")
const router = express.Router()
const passport = require('passport');
require("../middlewares/auth")
const { getMembership, updateMembership } = require("../controllers/membershipController")
const secure = passport.authenticate('jwt', { session: false })

// {{URL}}/membership/
router.route("/get").get(secure, getMembership)
router.route("/update").get(secure, updateMembership)

module.exports = router;
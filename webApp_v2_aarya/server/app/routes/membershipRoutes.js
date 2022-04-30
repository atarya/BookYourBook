const express = require("express")
const router = express.Router()
const passport = require('passport');
require("../middlewares/auth")
const { getMembership, updateMembership } = require("../controllers/membershipController")
const secure = passport.authenticate('jwt', { session: false })

// {{URL}}/membership/
router.route("/get").get(secure, getMembership) // Done
router.route("/update").put(secure, updateMembership)

module.exports = router;
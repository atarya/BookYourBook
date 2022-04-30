const express = require("express")
const router = express.Router()
const passport = require('passport');
const { passportLogin } = require("../middlewares/login")
require("../middlewares/auth")
const { registerUser, loginUser, getUser, getAllUsers, updateUser, deleteUser } = require("../controllers/userController")
const secure = passport.authenticate('jwt', { session: false })
const signup = passport.authenticate('signup', { session: false })

// {{URL}}/user/
router.route("/profiles").get(secure, getAllUsers) // Done
router.route("/register").post(signup, registerUser) // Done
router.route("/login").post(passportLogin, loginUser) // Done
router.route("/profile/:id").get(secure, getUser) // Done
router.route("/update").put(secure, updateUser) // Done
router.route("/delete/").delete(secure, deleteUser) // Done

module.exports = router;
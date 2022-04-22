const express = require("express")
const router = express.Router()
const passport = require('passport');
const { passportLogin } = require("../middlewares/login")
require("../middlewares/auth")
const { registerUser, loginUser, getUser, getAllUsers, updateUser, deleteUser } = require("../controllers/userController")
const secure = passport.authenticate('jwt', { session: false })
const signup = passport.authenticate('signup', { session: false })

// {{URL}}/user/
router.route("/profiles").get(secure, getAllUsers)
router.route("/register").post(signup, registerUser)
router.route("/login").post(passportLogin, loginUser)
router.route("/profile/:id").get(secure, getUser)
router.route("/update/:id").put(secure, updateUser)
router.route("/delete/:id").delete(secure, deleteUser)

module.exports = router;
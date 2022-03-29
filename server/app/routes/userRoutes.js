const express = require('express');
const router = express.Router();
const { registerUser, authUser, allUsers } = require('../controllers/userControllers');
const { protect } = require('../middlewares/auth');

router.route('/register').post(registerUser)
router.get("/", protect, allUsers)
router.post('/login', authUser);

module.exports = router;
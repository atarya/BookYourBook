const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const { sendMessage, allMessages } = require('../controllers/messageControllers');

router.route("/").post(protect, sendMessage);
router.route("/:chaiId").get(protect, allMessages);

module.exports = router;
const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const { sendMessage, allMessages } = require('../controllers/messageControllers');

router.route("/:chatId").get(protect, allMessages);
router.route("/").post(protect, sendMessage);

module.exports = router;
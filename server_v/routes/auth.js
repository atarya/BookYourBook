const express = require('express');
const auth = require('../controllers/auth.controller');

const router = express.Router();

router.get('/:message', auth.showMessage);

module.exports = router;
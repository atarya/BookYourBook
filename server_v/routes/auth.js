const express = require('express');
const auth = require('../controllers/auth.controller');

const router = express.Router();


router.post('/register', auth.register);

module.exports = router;
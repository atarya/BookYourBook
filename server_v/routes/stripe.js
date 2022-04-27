const express = require('express');
const router = express.Router();

// middlewares
const { requireSignin } = require('../middlewares');

// controllers
const { createConnectAccount } = require('../controllers/stripe.controller');


router.post("/create-connect-account", requireSignin, createConnectAccount);

module.exports = router;
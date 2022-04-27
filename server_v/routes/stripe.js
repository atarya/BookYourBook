const express = require('express');
const router = express.Router();

// middlewares
const { requireSignin } = require('../middlewares');

// controllers
const { createConnectAccount, getAccountStatus, getAccountBalance } = require('../controllers/stripe.controller');


router.post("/create-connect-account", requireSignin, createConnectAccount);
router.post("/get-account-status", requireSignin, getAccountStatus);
router.post("/get-account-balance", requireSignin, getAccountBalance);

module.exports = router;
const express = require('express');
const router = express.Router();
const { addUser, updateUser, getUser, getUsers, deleteUser } = require('../controllers/user');

router.get('/add', addUser);
router.get('/update', updateUser);
router.get('/get', getUser);
router.get('/getAll', getUsers);
router.get('/delete', deleteUser);

modules.export = router;
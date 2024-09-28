const express = require('express');
const UserController = require('../controllers/UserController');
const { validateRegistration } = require('../middleware/validateUser');

const router = express.Router();

router.post('/register', validateRegistration, UserController.register);

module.exports = router;

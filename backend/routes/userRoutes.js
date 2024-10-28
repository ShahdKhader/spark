const express = require('express');
const UserController = require('../controllers/UserController');
const { validateRegistration } = require('../middleware/validateUser');

const router = express.Router();

router.post('/signup', validateRegistration, UserController.register);
router.post('/signin', UserController.signin);
router.put('/changePassword', UserController.changePassword); 


module.exports = router;
